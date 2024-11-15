import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-seva-dark text-seva-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">SevaDrive</h3>
            <p className="mb-4">{t('footer.description')}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaFacebookF /></a>
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaTwitter /></a>
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaInstagram /></a>
              <a href="#" className="text-seva-light hover:text-seva-red transition-colors duration-300"><FaLinkedinIn /></a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-seva-red transition-colors duration-300">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-seva-red transition-colors duration-300">{t('footer.services')}</a></li>
              <li><a href="#" className="hover:text-seva-red transition-colors duration-300">{t('footer.contact')}</a></li>
              <li><a href="#" className="hover:text-seva-red transition-colors duration-300">{t('footer.privacy')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.contact')}</h3>
            <p className="mb-2">{t('footer.address')}</p>
            <p className="mb-2">{t('footer.phone')}: +91 9632598430</p>
            <p>{t('footer.email')}: info@sevadrive.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-seva-gray text-center">
          <p>&copy; 2023 SevaDrive. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;