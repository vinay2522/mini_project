import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const BookingForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    alert('Booking submitted successfully!');
    setFormData({
      name: '',
      phone: '',
      pickupLocation: '',
      dropoffLocation: '',
      date: '',
      time: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="section-title">{t('booking.title')}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">{t('booking.name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold">{t('booking.phone')}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="pickupLocation" className="block mb-1 font-semibold">{t('booking.pickupLocation')}</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="dropoffLocation" className="block mb-1 font-semibold">{t('booking.dropoffLocation')}</label>
          <input
            type="text"
            id="dropoffLocation"
            name="dropoffLocation"
            value={formData.dropoffLocation}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block mb-1 font-semibold">{t('booking.date')}</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block mb-1 font-semibold">{t('booking.time')}</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn btn-primary w-full"
        >
          {t('booking.submit')}
        </motion.button>
      </form>
    </div>
  );
};

export default BookingForm;
