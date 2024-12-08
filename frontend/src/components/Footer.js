import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHome, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-seva-dark text-seva-light py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* SevaDrive Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">SevaDrive</h3>
            <p className="mb-4">{t('about.description')}</p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaFacebookF /></a>
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaTwitter /></a>
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaInstagram /></a>
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-seva-red transition-colors duration-300"><FaHome /><span>{t('about.title')}</span></a></li>
              <li><a href="#" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-seva-red transition-colors duration-300"><FaHome /><span>{t('services')}</span></a></li>
              <li><a href="#" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-seva-red transition-colors duration-300"><FaHome /><span>{t('contact.title')}</span></a></li>
              <li><a href="#" className="flex items-center justify-center sm:justify-start space-x-2 hover:text-seva-red transition-colors duration-300"><FaHome /><span>{t('privacy')}</span></a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">{t('contact.title')}</h3>
            <p className="mb-2 flex items-center justify-center sm:justify-start"><FaHome className="mr-2" />{t('address')}</p>
            <p className="mb-2 flex items-center justify-center sm:justify-start"><FaPhoneAlt className="mr-2" />{t('phone')}: +91 9632598430</p>
            <p className="flex items-center justify-center sm:justify-start"><FaEnvelope className="mr-2" />{t('email')}: ambulanceeus@gmail.com</p>
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

