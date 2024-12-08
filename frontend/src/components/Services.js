import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaAmbulance, FaHeartbeat, FaWheelchair, FaHospital } from 'react-icons/fa';

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center text-center"
  >
    <Icon className="text-4xl sm:text-5xl text-seva-red dark:text-seva-blue mb-4" />
    <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm sm:text-base">{description}</p>
  </motion.div>
);

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: FaAmbulance,
      title: t('emergency'),
      description: t('emergency.description'),
    },
    {
      icon: FaHeartbeat,
      title: t('criticalCare'),
      description: t('criticalCare.description'),
    },
    {
      icon: FaWheelchair,
      title: t('nonEmergency'),
      description: t('nonEmergency.description'),
    },
    {
      icon: FaHospital,
      title: t('transfer'),
      description: t('transfer.description'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('services')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Services;

