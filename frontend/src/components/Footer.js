import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHome, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-seva-dark text-seva-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* SevaDrive Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">SevaDrive</h3>
            <p className="mb-4">{t('about.description')}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaFacebookF /></a>
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaTwitter /></a>
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaInstagram /></a>
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="flex items-center space-x-2 hover:text-seva-red transition-colors duration-300"><FaHome /><span>{t('about.title')}</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 hover:text-seva-red transition-colors duration-300"><FaHome /><span>{t('services')}</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 hover:text-seva-red transition-colors duration-300"><FaHome /><span>{t('contact.title')}</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 hover:text-seva-red transition-colors duration-300"><FaHome /><span>{t('privacy')}</span></a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('contact.title')}</h3>
            <p className="mb-2"><FaHome className="inline-block mr-2" />{t('address')}</p>
            <p className="mb-2"><FaPhoneAlt className="inline-block mr-2" />{t('phone')}: +91 9632598430</p>
            <p><FaEnvelope className="inline-block mr-2" />{t('email')}: ambulanceeus@gmail.com</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 pt-8 border-t border-seva-gray text-center">
          <p>&copy; 2023 SevaDrive. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
