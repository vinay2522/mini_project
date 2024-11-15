import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaAmbulance, FaHeartbeat, FaWheelchair, FaHospital } from 'react-icons/fa';

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="card p-6 flex flex-col items-center text-center"
  >
    <Icon className="text-5xl text-seva-red dark:text-seva-blue mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </motion.div>
);

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: FaAmbulance,
      title: t('services.emergency.title'),
      description: t('services.emergency.description'),
    },
    {
      icon: FaHeartbeat,
      title: t('services.criticalCare.title'),
      description: t('services.criticalCare.description'),
    },
    {
      icon: FaWheelchair,
      title: t('services.nonEmergency.title'),
      description: t('services.nonEmergency.description'),
    },
    {
      icon: FaHospital,
      title: t('services.transfer.title'),
      description: t('services.transfer.description'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="section-title text-center mb-12">{t('services.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Services;