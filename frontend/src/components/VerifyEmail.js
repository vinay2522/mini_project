import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/verify/${token}`);
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect to login page after 3 seconds
      } catch (error) {
        setMessage('Verification failed. Please try again.');
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto card">
        <h2 className="section-title text-center mb-8">Email Verification</h2>
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;