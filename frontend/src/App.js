import React, { Suspense, useState, startTransition } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import Hospitals from './components/Hospitals';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import Download from './components/Download';
import HelpDesk from './components/HelpDesk';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import LoadingSpinner from './components/LoadingSpinner';
import BookingForm from './components/BookingForm';
import './styles/global.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'Hospitals', path: '/hospitals' },
    { title: 'Blog', path: '/blog' },
    { title: 'Gallery', path: '/gallery' },
    { title: 'Download', path: '/download' },
    { title: 'Help Desk', path: '/helpdesk' },
  ];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <div className="min-h-screen">
          <motion.div
            animate={{
              width: isOpen ? "16rem" : "4rem",
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              damping: 10,
            }}
            className="fixed left-0 top-0 h-screen bg-white shadow-lg z-50 border-r border-gray-200"
          >
            <div className="flex flex-col h-full">
              {/* Logo and Toggle */}
              <div className="flex items-center justify-between p-4">
                <div className="flex flex-col items-center">
                  <img
                    src="/images/seva-logo.webp"
                    alt="SevaDrive Logo"
                    className="w-19 h-19 rounded-full"
                  />
                  {isOpen && (
                    <span className="mt-2 font-bold text-xl">
                      
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  {isOpen ? '←' : '→'}
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 mt-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center px-4 py-3 text-gray-700 
                      hover:bg-gray-100 transition-colors duration-200
                      ${!isOpen && 'justify-center'}`}
                  >
                    <Link to={item.path} className={`${!isOpen && 'hidden'} ml-2`}>
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
            <Header />
            <main className="min-h-screen p-4">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/hospitals" element={<Hospitals />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/download" element={<Download />} />
                  <Route path="/helpdesk" element={<HelpDesk />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/booking" element={<BookingForm />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;