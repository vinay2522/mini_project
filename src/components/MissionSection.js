import React from 'react';
import { FaAmbulance, FaClock, FaUserMd, FaHospital } from 'react-icons/fa';

const MissionSection = () => {
  return (
    <div className="mission-section py-12">
      <div className="mission-container max-w-4xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
        <p className="mb-8">
          At <strong>SevaDrive</strong>, our mission is to ensure that every individual has timely access to medical care, regardless of their circumstances. We are committed to providing efficient and compassionate ambulance services that prioritize patient comfort and safety.
        </p>
        
        <h4 className="text-2xl font-semibold mb-4">Why We Started</h4>
        <p className="mb-8">
          We began this journey with a vision to fill the gaps in emergency medical transportation. Many individuals face delays in accessing healthcare due to inadequate services. Our founder experienced this first-hand and felt a calling to create a reliable solution for those in need.
        </p>

        <h4 className="text-2xl font-semibold mb-4">Our Goals</h4>
        <ul className="goal-list mb-8 space-y-4">
          <li className="flex items-center"><FaAmbulance className="mr-2 text-red-600" /> To reduce emergency response times through efficient logistics and communication.</li>
          <li className="flex items-center"><FaClock className="mr-2 text-red-600" /> To offer 24/7 availability for both emergency and non-emergency transport.</li>
          <li className="flex items-center"><FaUserMd className="mr-2 text-red-600" /> To continually invest in staff training and modern equipment to enhance service quality.</li>
          <li className="flex items-center"><FaHospital className="mr-2 text-red-600" /> To foster partnerships with local hospitals and healthcare providers for seamless patient transitions.</li>
        </ul>

        <h4 className="text-2xl font-semibold mb-4">Our Achievements</h4>
        <p className="mb-8">
          Since our inception, we have successfully transported over <strong>10,000 patients</strong>, receiving accolades for our commitment to service excellence. Our fleet has expanded to include various ambulance types, equipped with advanced medical technology.
        </p>

        <h4 className="text-2xl font-semibold mb-4">Our Vision for the Future</h4>
        <p>
          Looking ahead, we aspire to become the leading ambulance service provider in the region, recognized for our innovative approaches and unwavering dedication to patient care. Our ultimate goal is to enhance healthcare accessibility for all, ensuring that no one is left behind in their time of need.
        </p>
      </div>
    </div>
  );
};

export default MissionSection;