import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setLoading(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profile`);
        setUser(response.data);
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/register`, userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, credentials);
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/logout`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
        } catch (err) {
          console.error('Server logout failed:', err);
        }
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      if (!user?._id) throw new Error('User ID not found');

      console.log('Updating profile with data:', profileData);
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${user._id}/profile`,
        profileData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Profile update response:', response.data);

      if (response.data) {
        setUser(response.data);
        return response.data;
      }
      throw new Error('No data received from server');
    } catch (err) {
      console.error('Profile update error details:', err.response || err);
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      console.log('Uploading profile picture...');
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Avatar upload response:', response.data);

      if (response.data?.avatarUrl) {
        setUser(prev => ({
          ...prev,
          avatar: response.data.avatarUrl
        }));
        return response.data;
      }
      throw new Error('No avatar URL received from server');
    } catch (err) {
      console.error('Avatar upload error details:', err.response || err);
      setError(err.response?.data?.message || 'Failed to upload profile picture');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        register,
        login,
        logout,
        checkAuth,
        updateProfile,
        uploadProfilePicture
      }}
    >
      {loading && <LoadingSpinner fullScreen />}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
