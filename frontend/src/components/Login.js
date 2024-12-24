import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import LoadingSpinner from './ui/LoadingSpinner';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('password');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  
  const { login: authLogin, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile'; // Update redirect URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (loginMethod === 'password') {
        await authLogin({ login, password });
        navigate(from, { replace: true });
      } else if (loginMethod === 'otp') {
        if (!otpSent) {
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/send-login-otp`, { login });
          setUserId(response.data.userId);
          setOtpSent(true);
        } else {
          await authLogin({ userId, otp, method: 'otp' });
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleResendOTP = async () => {
    setError(null);
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/resend-otp`, { userId });
      setError('New OTP sent successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <>
      {loading && <LoadingSpinner fullScreen />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-900">Welcome back</h2>
            <p className="mt-2 text-center text-gray-600">
              Please sign in to your account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-center space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setLoginMethod('password')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                loginMethod === 'password'
                  ? 'bg-seva-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={loading}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('otp')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                loginMethod === 'otp'
                  ? 'bg-seva-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={loading}
            >
              OTP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                {loginMethod === 'password' ? 'Email or Phone' : 'Phone Number'}
              </label>
              <input
                id="login"
                type={loginMethod === 'password' ? 'text' : 'tel'}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-seva-red focus:ring-seva-red"
                required
                disabled={loading}
              />
            </div>

            {loginMethod === 'password' ? (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-seva-red focus:ring-seva-red"
                  required
                  disabled={loading}
                />
              </div>
            ) : (
              otpSent && (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-seva-red focus:ring-seva-red"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="mt-2 text-seva-red hover:text-seva-red/80 text-sm"
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                </div>
              )
            )}

            <button
              type="submit"
              className="relative w-full bg-seva-red text-white py-2 px-4 rounded-lg hover:bg-seva-red/90 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              <span className={loading ? 'invisible' : ''}>
                {loginMethod === 'password'
                  ? 'Sign In'
                  : otpSent
                  ? 'Verify OTP'
                  : 'Send OTP'}
              </span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner small />
                </div>
              )}
            </button>
          </form>

          <div className="text-center space-y-2">
            {loginMethod === 'password' && (
              <Link
                to="/forgot-password"
                className="text-sm text-seva-red hover:text-seva-red/80"
              >
                Forgot your password?
              </Link>
            )}
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-seva-red hover:text-seva-red/80">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
