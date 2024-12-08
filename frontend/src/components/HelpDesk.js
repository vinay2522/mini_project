import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import Section from './Section';

const HelpDesk = () => {
  return (
    <Section id="helpdesk" title="Help Desk">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="p-4 sm:p-6 md:p-8 bg-white text-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
          <p className="mb-4 text-sm sm:text-base text-gray-600">
            If you have any questions or need assistance, please feel free to contact us.
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:ambulanceeus@gmail.com" 
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm sm:text-base"
            >
              <FaEnvelope className="mr-2 flex-shrink-0" />
              <span className="break-all">ambulanceeus@gmail.com</span>
            </a>
            <a 
              href="tel:+919632598430" 
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm sm:text-base"
            >
              <FaPhone className="mr-2 flex-shrink-0" />
              <span>+91 9632598430</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HelpDesk;

