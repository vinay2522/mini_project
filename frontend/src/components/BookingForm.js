import React, { useState } from 'react';

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
        const { latitude, longitude } = position.coords;
        
        // Log the coordinates for debugging
        console.log('Obtained Location:', { latitude, longitude });

        setBookingData(prev => ({
          ...prev,
          latitude,
          longitude,
        }));
        
        // Immediately call handleBooking with updated coordinates
        handleBooking(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation Error:', error);
        setError('Unable to retrieve your location. Please enable location access.');
        setLoading(false);
      }
    );
  };

  const handleBooking = async (lat, lon) => {
    try {
      // Ensure we have both latitude and longitude
      if (lat === null || lon === null) {
        throw new Error('Location coordinates are missing');
      }

      // Use the latest coordinates from the function parameters
      const bookingPayload = {
        ...bookingData,
        latitude: lat,
        longitude: lon
      };

      console.log('Booking Payload:', bookingPayload);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      });

      if (response.status === 201) {
        setSuccess(true);
        setLoading(false);
        setStep(3);
      } else {
        // Try to parse error message from response
        const errorData = await response.json();
        throw new Error(errorData.message || 'Booking failed');
      }
    } catch (err) {
      console.error('Booking Error:', err);
      
      // More detailed error handling
      setError(err.message || 'Network error. Please check your connection.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white text-gray-800 rounded-lg p-6 max-w-md w-full shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
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
                className="flex items-center gap-3 w-full p-4 text-left rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                <span className="text-2xl">{type.icon}</span>
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-6 text-gray-600">
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
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
          </div>
        )}

        {step === 3 && success && (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Booking Successful!</h3>
            <p className="text-gray-600">
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