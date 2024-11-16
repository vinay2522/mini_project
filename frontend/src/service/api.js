// service/api.js
const API_URL = 'http://localhost:5000/api';

// Helper function to handle fetch requests
const fetchData = async (url, method, data = null) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        // Handle non-200 status codes
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }

        return response.json();
    } catch (error) {
        console.error('API Error:', error.message);
        return { error: error.message };
    }
};

// Register a new user
export const registerUser = (userData) => {
    return fetchData(`${API_URL}/register`, 'POST', userData);
};

// Login a user
export const loginUser = (credentials) => {
    return fetchData(`${API_URL}/login`, 'POST', credentials);
};

// Submit contact form data
export const submitContact = (contactData) => {
    return fetchData(`${API_URL}/contact`, 'POST', contactData);
};

// Verify email
export const verifyEmail = (token) => {
    return fetchData(`${API_URL}/verify/${token}`, 'GET');
};

// Resend verification email
export const resendVerification = (email) => {
    return fetchData(`${API_URL}/resend-verification`, 'POST', { email });
};
