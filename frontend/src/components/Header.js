import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhone, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center hover-scale">
          {/* <img src="/images/seva-logo.webp" alt="SevaDrive Logo" className="h-12 w-12 mr-2" /> */}
          <h1 className="text-4xl font-display font-bold text-seva-red">SevaDrive</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <a href="https://wa.me/9632598430" target="_blank" rel="noopener noreferrer" className="flex items-center text-seva-dark hover:text-seva-red transition-colors duration-300">
            <FaWhatsapp className="mr-2" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
          <a href="tel:9632598430" className="flex items-center text-seva-dark hover:text-seva-red transition-colors duration-300">
            <FaPhone className="mr-2" />
            <span className="hidden md:inline">Call</span>
          </a>
          {!loading && (
            user ? (
              <div className="flex items-center space-x-2">
                <FaUser className="text-seva-dark" />
                <span className="hidden md:inline text-seva-dark">{user.email}</span>
                <button onClick={handleLogout} className="btn btn-primary">
                  <FaSignOutAlt className="mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;