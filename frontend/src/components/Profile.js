import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import LoadingSpinner from './ui/LoadingSpinner';

// Use the SVG default avatar
const defaultAvatar = '/images/default-avatar.svg';

const Profile = () => {
  const { user, error: authError, setError, updateProfile, uploadProfilePicture } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validatePhone = (phone) => {
    if (!phone) return true; // Allow empty phone number
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!user?._id) {
      setProfileError('User ID not found. Please try logging in again.');
      return;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      setProfileError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setProfileError(null);
    setError(null);

    try {
      console.log('Submitting profile data:', formData);
      const updatedUser = await updateProfile({
        name: formData.name || undefined,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        bio: formData.bio || undefined,
        email: formData.email || undefined
      });
      
      console.log('Profile updated successfully:', updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update error:', err);
      setProfileError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [formData, setError, user, updateProfile]);

  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setProfileError('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProfileError('Image size should be less than 5MB');
      return;
    }

    setLoading(true);
    setProfileError(null);
    setError(null);

    try {
      console.log('Uploading file:', file.name, 'Type:', file.type, 'Size:', file.size);
      const formData = new FormData();
      formData.append('avatar', file);

      const updatedUser = await uploadProfilePicture(formData);
      console.log('Avatar updated successfully:', updatedUser);
    } catch (err) {
      console.error('Avatar upload error:', err);
      setProfileError(err.response?.data?.message || 'Failed to upload profile picture. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [uploadProfilePicture, setError]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Profile</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        {(profileError || authError) && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {profileError || authError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center mb-6">
          <div className="relative mb-4 sm:mb-0 sm:mr-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-50">
              <img
                src={user?.avatar || defaultAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
              <FaCamera className="text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageUpload}
                disabled={loading}
              />
            </label>
          </div>
          
          <div className="flex-1 w-full sm:w-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing || loading}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing || loading}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing || loading}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing || loading}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing || loading}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setProfileError(null);
                      if (user) {
                        setFormData({
                          name: user.name || '',
                          email: user.email || '',
                          phone: user.phone || '',
                          address: user.address || '',
                          bio: user.bio || ''
                        });
                      }
                    }}
                    disabled={loading}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FaTimes className="inline mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaSave className="inline mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Profile;
