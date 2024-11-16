import React, { useEffect, useState } from 'react';
import { verifyEmail } from './service/api';
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const { token } = useParams(); // Assuming you're using React Router
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            const response = await verifyEmail(token);
            if (response.error) {
                setMessage(response.error);
            } else {
                setMessage('Email verified successfully.');
            }
        };
        verify();
    }, [token]);

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{message}</p>
        </div>
    );
};

export default VerifyEmail;
