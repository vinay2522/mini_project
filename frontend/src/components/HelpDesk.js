import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import Section from './Section';
import { useTheme } from '../context/ThemeContext';

const HelpDesk = () => {
  const { darkMode } = useTheme();

  return (
    <Section id="helpdesk" title="Help Desk">
      <div className="container mx-auto px-4 py-10">
        <div className={`p-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Contact Us</h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            If you have any questions or need assistance, please feel free to contact us.
          </p>
          <div className="space-y-4">
            <a href="mailto:ambulanceeus@gmail.com" 
               className={`flex items-center hover:text-blue-800 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600'}`}>
              <FaEnvelope className="mr-2" />
              ambulanceeus@gmail.com
            </a>
            <a href="tel:+919632598430" 
               className={`flex items-center hover:text-blue-800 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600'}`}>
              <FaPhone className="mr-2" />
              +91 9632598430
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HelpDesk;