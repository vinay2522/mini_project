const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);

// Rate limiting
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});
app.use('/api/login', loginLimiter);

const resetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many password reset requests from this IP, please try again after 15 minutes'
});
app.use('/api/reset-password-request', resetLimiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    username: { type: String, unique: true, sparse: true }, // Add this line if username is optional
    verificationToken: String,
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const User = mongoose.model('User', userSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
    emergencyType: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    email: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Helper function to send emails
const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        });
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, username } = req.body; // Include username

        // Validate user input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create verification token
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            username, // Include username
            verificationToken
        });

        await user.save();

        // Send verification email
        const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
        const emailSent = await sendEmail(
            email,
            'Verify Your Email',
            `Please click this link to verify your email: <a href="${verificationUrl}">Verify Email</a>`
        );

        if (emailSent) {
            res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
        } else {
            res.status(500).json({ message: 'Registration successful but verification email could not be sent.' });
        }

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Email verification endpoint
app.get('/api/verify/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findOne({ email: decoded.email, verificationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        // Redirect to login page after successful verification
        res.redirect(`${process.env.FRONTEND_URL}/login`);
    } catch (error) {
        res.status(500).json({ message: 'Invalid token or server error' });
    }
});

// Booking endpoint
app.post('/api/bookings', async (req, res) => {
    try {
        const { emergencyType, latitude, longitude, email } = req.body;

        // Validate input
        if (!emergencyType || latitude === null || longitude === null) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new booking
        const booking = new Booking({
            emergencyType,
            latitude,
            longitude,
            email
        });

        await booking.save();

        // Send confirmation email if email is provided
        if (email) {
            const emailSent = await sendEmail(
                email,
                'Booking Confirmation',
                `
                <h3>Booking Confirmation</h3>
                <p>Your booking for an ambulance has been confirmed.</p>
                <p>Emergency Type: ${emergencyType}</p>
                <p>Location: (${latitude}, ${longitude})</p>
                <p>An ambulance has been dispatched to your location. Please stay where you are.</p>
                `
            );

            if (!emailSent) {
                console.error('Failed to send booking confirmation email');
            }
        }

        res.status(201).json({ message: 'Booking successful' });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your email first' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Password reset request endpoint
app.post('/api/reset-password-request', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Send reset email
        const emailSent = await sendEmail(
            email,
            'Password Reset Code',
            `Your password reset code is: ${resetToken}. This code will expire in 1 hour.`
        );

        if (emailSent) {
            res.json({ message: 'Password reset code sent to your email' });
        } else {
            res.status(500).json({ message: 'Error sending reset code email' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Reset password endpoint
app.post('/api/reset-password', async (req, res) => {
    try {
        const { email, resetToken, newPassword } = req.body;

        const user = await User.findOne({
            email,
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // Save contact message
        const contact = new Contact({
            name,
            email,
            message
        });

        await contact.save();

        // Send notification email to admin
        const emailSent = await sendEmail(
            process.env.ADMIN_EMAIL,
            'New Contact Form Submission',
            `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
            `
        );

        // Send confirmation email to user
        const userEmailSent = await sendEmail(
            email,
            'Thank you for contacting us',
            `
            <h3>Thank you for reaching out!</h3>
            <p>We have received your message and will get back to you shortly.</p>
            <p>Your message:</p>
            <p>${message}</p>
            `
        );

        res.status(201).json({ message: 'Message sent successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});