import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaHospital, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const HospitalCard = ({ name, address, phone }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="card p-6"
  >
    <FaHospital className="text-4xl text-seva-red dark:text-seva-blue mb-4" />
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="flex items-center mb-2">
      <FaMapMarkerAlt className="mr-2 text-seva-gray" />
      {address}
    </p>
    <p className="flex items-center">
      <FaPhone className="mr-2 text-seva-gray" />
      {phone}
    </p>
  </motion.div>
);

const Hospitals = () => {
  const { t } = useTranslation();

  const hospitals = [
    {
      name: "City General Hospital",
      address: "123 Main St, Tumakuru",
      phone: "+91 1234567890"
    },
    {
      name: "Lifeline Medical Center",
      address: "456 Park Ave, Tumakuru",
      phone: "+91 9876543210"
    },
    {
      name: "Sunshine Hospital",
      address: "789 Oak Rd, Tumakuru",
      phone: "+91 5555555555"
    },
    {
      name: "Care & Cure Hospital",
      address: "321 Pine St, Tumakuru",
      phone: "+91 9999999999"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="section-title text-center mb-12">{t('hospitals.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hospitals.map((hospital, index) => (
          <HospitalCard key={index} {...hospital} />
        ))}
      </div>
    </div>
  );
};

export default Hospitals;