const API_URL = 'http://localhost:5000/api';

const fetchData = async (url, method, data) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
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
