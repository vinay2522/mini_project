import React, { useState, useEffect, useCallback } from 'react';
import MapComponent from './MapComponent';

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
  const [showMap, setShowMap] = useState(false);
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const emergencyTypes = [
    { id: 'cardiac', label: 'Cardiac Arrest', icon: '🫀' },
    { id: 'stroke', label: 'Stroke', icon: '🧠' },
    { id: 'accident', label: 'Accident', icon: '🚗' },
    { id: 'breathing', label: 'Breathing Problem', icon: '🫁' },
    { id: 'other', label: 'Other Emergency', icon: '🏥' },
  ];

  const fetchLocations = useCallback(async () => {
    if (!bookingId) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/locations/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch locations');
      const data = await response.json();
      if (data.ambulanceLocation?.latitude && data.ambulanceLocation?.longitude) {
        setAmbulanceLocation({
          lat: data.ambulanceLocation.latitude,
          lng: data.ambulanceLocation.longitude
        });
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      setError('Failed to update ambulance location. Please try again.');
    }
  }, [bookingId]);

  useEffect(() => {
    let intervalId;
    if (showMap && bookingId) {
      intervalId = setInterval(() => {
        fetchLocations();
      }, 5000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showMap, bookingId, fetchLocations]);

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
        setBookingData(prev => ({
          ...prev,
          latitude,
          longitude,
        }));
        handleBooking(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation Error:', error);
        setError('Unable to retrieve your location. Please enable location access.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleBooking = async (lat, lon) => {
    try {
      const bookingPayload = {
        ...bookingData,
        latitude: lat,
        longitude: lon
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingPayload)
      });

      if (!response.ok) throw new Error('Booking failed');
      
      const data = await response.json();
      setSuccess(true);
      setLoading(false);
      setStep(3);
      setBookingId(data.bookingId);
      
      // Fetch nearest ambulance
      const nearestAmbulanceResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/find-nearest-ambulance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ latitude: lat, longitude: lon })
      });

      if (!nearestAmbulanceResponse.ok) throw new Error('Failed to find nearest ambulance');
      
      const nearestAmbulanceData = await nearestAmbulanceResponse.json();
      setAmbulanceLocation({
        lat: nearestAmbulanceData.latitude,
        lng: nearestAmbulanceData.longitude
      });

      setShowMap(true);
      fetchLocations();
    } catch (err) {
      console.error('Booking Error:', err);
      setError('Failed to book ambulance. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`bg-white text-gray-800 rounded-lg p-6 max-w-md w-full shadow-md ${showMap ? 'hidden' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
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
                className="flex items-center gap-3 w-full p-4 text-left rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
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
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition duration-300"
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
            <button
              onClick={() => setShowMap(true)}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Track Ambulance
            </button>
          </div>
        )}
      </div>

      {showMap && bookingData.latitude !== null && bookingData.longitude !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="w-full h-full sm:w-11/12 sm:h-5/6 bg-white rounded-lg overflow-hidden">
            <MapComponent 
              userLocation={{ lat: bookingData.latitude, lng: bookingData.longitude }} 
              ambulanceLocation={ambulanceLocation}
            />
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
            >
              Close Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;

