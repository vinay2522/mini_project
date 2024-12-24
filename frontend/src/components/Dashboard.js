import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import Profile from './Profile';
import BookingHistory from './BookingHistory';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profile`, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data) {
          setUser(response.data);
          setError('');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again.');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Welcome</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <img
                  src={user?.avatar || 'https://via.placeholder.com/40'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">{user?.name || user?.username}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveSection('profile')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeSection === 'profile'
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
                    }`}
                  >
                    <FaUser className="w-5 h-5 mr-3" />
                    <span className="font-medium">Profile</span>
                  </button>

                  <button
                    onClick={() => setActiveSection('bookings')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeSection === 'bookings'
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
                    }`}
                  >
                    <FaHistory className="w-5 h-5 mr-3" />
                    <span className="font-medium">Booking History</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                  >
                    <FaSignOutAlt className="w-5 h-5 mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl border border-red-200 flex items-center">
                <span>{error}</span>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {activeSection === 'profile' && (
                <Profile user={user} setUser={setUser} />
              )}

              {activeSection === 'bookings' && (
                <BookingHistory userId={user?._id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;  