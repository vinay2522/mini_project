const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('trust proxy', 1);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
});

// Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true, minlength: 8 },
  isVerified: { type: Boolean, default: false },
  verificationOTP: String,
  otpExpiry: Date,
  lastOTPSent: Date,
  name: String,
  bio: String,
  avatar: String,
  address: String,
  phone: String
});

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceName: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  time: String,
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = { userId: decoded.userId };
    next();
  });
};

// Profile Routes
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -verificationOTP -otpExpiry');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/users/:id/profile', authenticateToken, async (req, res) => {
  try {
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const { name, email, phone, address, bio } = req.body;
    const updateData = { name, email, phone, address, bio };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -verificationOTP -otpExpiry');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Avatar Upload Route
app.post('/api/users/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete old avatar if it exists
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // Update user with new avatar path
    const avatarUrl = `/uploads/${req.file.filename}`;
    user.avatar = avatarUrl;
    await user.save();

    res.json({ avatarUrl });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size is too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

// Helper Functions
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Check if it's an Indian number
  if (digits.length === 10) {
    return `+91${digits}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  } else if (digits.length === 13 && digits.startsWith('+91')) {
    return digits;
  }
  throw new Error('Invalid phone number format. Please enter a valid 10-digit Indian mobile number.');
};

async function sendOTP(mobileNumber) {
  const otp = generateOTP();
  const isDevelopment = process.env.NODE_ENV === 'development';

  try {
    if (isDevelopment) {
      // In development, just log the OTP and return it
      console.log(`[DEV MODE] OTP for ${mobileNumber}: ${otp}`);
      return otp;
    } else {
      // In production, use Twilio
      await twilioClient.messages.create({
        body: `Your SevaDrive verification code is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: mobileNumber
      });
      return otp;
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    if (isDevelopment) {
      // In development, still return the OTP even if Twilio fails
      return otp;
    }
    throw new Error('Failed to send OTP');
  }
}

// Twilio client setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, mobileNumber, email, password } = req.body;

    // Validate required fields
    if (!username || !mobileNumber || !password) {
      return res.status(400).json({ message: 'Username, mobile number, and password are required' });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Validate and format mobile number
    let formattedMobileNumber;
    try {
      formattedMobileNumber = formatPhoneNumber(mobileNumber);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [
        { username },
        { mobileNumber: formattedMobileNumber },
        { email: email ? email.toLowerCase() : undefined }
      ]
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      if (existingUser.mobileNumber === formattedMobileNumber) {
        return res.status(400).json({ message: 'Mobile number already registered' });
      }
      if (email && existingUser.email === email.toLowerCase()) {
        return res.status(400).json({ message: 'Email already registered' });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      mobileNumber: formattedMobileNumber,
      email: email ? email.toLowerCase() : undefined,
      password: hashedPassword,
      isVerified: process.env.NODE_ENV === 'development' // Auto-verify in development
    });

    // Generate and send OTP
    const otp = await sendOTP(formattedMobileNumber);
    user.verificationOTP = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.lastOTPSent = new Date();

    // Save user
    await user.save();

    // In development, auto-generate token
    if (process.env.NODE_ENV === 'development') {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.status(201).json({
        message: 'Registration successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    }

    // In production, require OTP verification
    res.status(201).json({
      message: 'Registration initiated. Please verify your mobile number.',
      userId: user._id
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { login, password, useOTP } = req.body;

    const user = await User.findOne({
      $or: [
        { username: login },
        { mobileNumber: formatPhoneNumber(login) },
        { email: login }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your mobile number first' });
    }

    if (useOTP) {
      const otp = await sendOTP(user.mobileNumber);
      user.verificationOTP = otp;
      user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      user.lastOTPSent = new Date();
      await user.save();

      return res.json({
        message: 'OTP sent for login verification',
        userId: user._id
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.verificationOTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    user.isVerified = true;
    user.verificationOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Mobile number verified successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/verify-login-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.verificationOTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/resend-otp', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const otp = await sendOTP(user.mobileNumber);
    user.verificationOTP = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.lastOTPSent = new Date();
    await user.save();

    res.json({ message: 'OTP resent successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/bookings/:userId', authenticateToken, async (req, res) => {
  try {
    // Ensure the authenticated user is requesting their own bookings
    if (req.user.userId !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized access to bookings' });
    }

    const bookings = await Booking.find({ userId: req.params.userId })
      .sort({ date: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { serviceName, description, date, time } = req.body;
    const booking = new Booking({
      userId: req.user.userId,
      serviceName,
      description,
      date,
      time
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/test-booking', authenticateToken, async (req, res) => {
  try {
    const testBooking = new Booking({
      userId: req.user.userId,
      serviceName: 'Test Service',
      description: 'This is a test booking',
      date: new Date(),
      time: '12:00 PM',
      status: 'pending'
    });
    await testBooking.save();
    res.status(201).json({ message: 'Test booking created successfully', booking: testBooking });
  } catch (error) {
    console.error('Error creating test booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// New route for contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({ message: 'Contact message sent successfully' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});