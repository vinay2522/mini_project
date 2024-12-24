import React from 'react';
import { FaAmbulance, FaClock, FaUserMd, FaHospital } from 'react-icons/fa';

const MissionSection = () => {
  return (
    <div className="mission-section py-12">
      <div className="mission-container max-w-4xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
        <p className="mb-8">
          At <strong>SevaDrive</strong>, our mission is to ensure that every individual has timely access to medical
          care, regardless of their circumstances.
        </p>
        <h4 className="text-2xl font-semibold mb-4">Why We Started</h4>
        <p className="mb-8">
          We began this journey to fill the gaps in emergency medical transportation. Many individuals face delays in
          accessing healthcare due to inadequate services.
        </p>
        <h4 className="text-2xl font-semibold mb-4">Our Goals</h4>
        <ul className="goal-list mb-8 space-y-4">
          <li className="flex items-center">
            <FaAmbulance className="mr-2 text-red-600" /> Reduce emergency response times.
          </li>
          <li className="flex items-center">
            <FaClock className="mr-2 text-red-600" /> 24/7 availability.
          </li>
          <li className="flex items-center">
            <FaUserMd className="mr-2 text-red-600" /> Invest in staff training.
          </li>
          <li className="flex items-center">
            <FaHospital className="mr-2 text-red-600" /> Partner with hospitals.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MissionSection;
