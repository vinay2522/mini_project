import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reset-password-request`, { email });
      setMessage(response.data.message);
      setError(null);
      navigate('/reset-password', { 
        state: { 
          email,
          message: 'A reset token has been sent to your email' 
        } 
      });
    } catch (error) {
      if (error.response?.status === 429) {
        setError('Too many requests. Please try again later.');
      } else {
        setError(error.response?.data?.message || 'Something went wrong');
      }
      setMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
        </div>
        
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">
            {error}
          </p>
        )}
        
        {message && (
          <p className="mt-2 text-center text-sm text-green-600">
            {message}
          </p>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send reset email
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link 
            to="/login" 
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

