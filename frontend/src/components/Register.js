import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './ui/LoadingSpinner';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const validateForm = () => {
    const { username, mobileNumber, password, confirmPassword } = formData;
    
    if (!username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!mobileNumber.trim()) {
      setError('Mobile number is required');
      return false;
    }
    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await register({
        username: formData.username,
        phone: formData.mobileNumber,
        password: formData.password
      });
      
      setUserId(response.userId);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await register({
        userId,
        otp,
        verifyOtp: true
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {isLoading && <LoadingSpinner fullScreen />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          {step === 1 ? 'Register' : 'Verify Mobile Number'}
        </h2>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4 text-center">
            Registration successful! Redirecting to login...
          </p>
        )}

        {step === 1 ? (
          <form onSubmit={handleInitialSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="username" className="block mb-1 font-semibold text-sm sm:text-base">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-seva-red"
                required
              />
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block mb-1 font-semibold text-sm sm:text-base">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-seva-red"
                required
                pattern="[0-9]{10}"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-semibold text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-seva-red"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1 font-semibold text-sm sm:text-base">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-seva-red"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-seva-red text-white py-2 px-4 rounded-md hover:bg-seva-red/90 transition duration-300 text-sm sm:text-base ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="otp" className="block mb-1 font-semibold text-sm sm:text-base">
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-seva-red"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-seva-red text-white py-2 px-4 rounded-md hover:bg-seva-red/90 transition duration-300 text-sm sm:text-base ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
        
        <p className="mt-4 text-center text-sm sm:text-base">
          Already have an account?{' '}
          <Link to="/login" className="text-seva-red hover:text-seva-red/90 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
