import React, { useState } from 'react';
import './BookingForm.css';
import axios from 'axios';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    emergencyType: '',
    latitude: null,
    longitude: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const emergencyTypes = [
    { id: 'cardiac', label: 'Cardiac Arrest', icon: '🫀' },
    { id: 'stroke', label: 'Stroke', icon: '🧠' },
    { id: 'accident', label: 'Accident', icon: '🚗' },
    { id: 'breathing', label: 'Breathing Problem', icon: '🫁' },
    { id: 'other', label: 'Other Emergency', icon: '🏥' },
  ];

  const handleEmergencyTypeSelect = (type) => {
    setBookingData(prev => ({ ...prev, emergencyType: type }));
    setStep(2);
  };

  const getLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setBookingData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        handleBooking();
      },
      (error) => {
        setError('Unable to retrieve your location. Please enable location access.');
        setLoading(false);
      }
    );
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post('/api/bookings', bookingData);
      if (response.status === 201) {
        setSuccess(true);
        setLoading(false);
        setStep(3);
      } else {
        throw new Error('Booking failed');
      }
    } catch (err) {
      setError('Failed to book ambulance. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 text-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            {step === 1 && 'Select Emergency Type'}
            {step === 2 && 'Location Access'}
            {step === 3 && 'Booking Confirmation'}
          </h2>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 gap-3">
            {emergencyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleEmergencyTypeSelect(type.id)}
                className="flex items-center gap-3 w-full p-4 text-left rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">{type.icon}</span>
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-6 text-gray-300">
              We need your location to send the nearest available ambulance to you.
              Please enable location access when prompted.
            </p>
            <button
              onClick={getLocation}
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
            >
              {loading ? 'Processing...' : 'Share Location & Book Now'}
            </button>
            {error && (
              <div className="mt-4 p-3 bg-red-800 text-red-300 rounded-md">
                {error}
              </div>
            )}
          </div>
        )}

        {step === 3 && success && (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-green-300 mb-2">Booking Successful!</h3>
            <p className="text-gray-300">
              An ambulance has been dispatched to your location.
              Please stay where you are.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
