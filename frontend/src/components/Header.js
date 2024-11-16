import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhone, FaUser, FaSignOutAlt, FaMoon, FaSun, FaLanguage } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { user, loading } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white dark:bg-seva-dark shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center hover-scale">
          <img src="/logo.png" alt="SevaDrive Logo" className="h-12 w-12 mr-2" />
          <h1 className="text-2xl font-display font-bold text-seva-red dark:text-seva-blue">SevaDrive</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <a href="https://wa.me/9632598430" target="_blank" rel="noopener noreferrer" className="flex items-center text-seva-dark dark:text-seva-light hover:text-seva-red dark:hover:text-seva-blue transition-colors duration-300">
            <FaWhatsapp className="mr-2" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
          <a href="tel:9632598430" className="flex items-center text-seva-dark dark:text-seva-light hover:text-seva-red dark:hover:text-seva-blue transition-colors duration-300">
            <FaPhone className="mr-2" />
            <span className="hidden md:inline">Call</span>
          </a>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-seva-light dark:bg-seva-dark text-seva-dark dark:text-seva-light hover:bg-seva-gray dark:hover:bg-seva-gray transition-colors duration-300"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="relative group">
            <button className="flex items-center text-seva-dark dark:text-seva-light hover:text-seva-red dark:hover:text-seva-blue transition-colors duration-300">
              <FaLanguage className="mr-2" />
              <span className="hidden md:inline">Language</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-seva-dark rounded-md shadow-lg hidden group-hover:block">
              <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm text-seva-dark dark:text-seva-light hover:bg-seva-light dark:hover:bg-seva-gray transition-colors duration-300">English</button>
              <button onClick={() => changeLanguage('kn')} className="block w-full text-left px-4 py-2 text-sm text-seva-dark dark:text-seva-light hover:bg-seva-light dark:hover:bg-seva-gray transition-colors duration-300">ಕನ್ನಡ</button>
            </div>
          </div>
          {!loading && (
            user ? (
              <div className="flex items-center space-x-2">
                <FaUser className="text-seva-dark dark:text-seva-light" />
                <span className="hidden md:inline text-seva-dark dark:text-seva-light">{user.email}</span>
                <button onClick={handleLogout} className="btn btn-primary">
                  <FaSignOutAlt className="mr-2" />
                  <span className="hidden md:inline">{t('logout')}</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                {t('login')}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;