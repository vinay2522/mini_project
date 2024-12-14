import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaHospital, FaBlog, FaImages, FaDownload, FaQuestionCircle } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Home', path: '/', icon: FaHome },
    { title: 'Services', path: '/services', icon: MdMedicalServices },
    { title: 'Hospitals', path: '/hospitals', icon: FaHospital },
    { title: 'Blog', path: '/blog', icon: FaBlog },
    { title: 'Gallery', path: '/gallery', icon: FaImages },
    { title: 'Download', path: '/download', icon: FaDownload },
    { title: 'Contact Us', path: '/helpdesk', icon: FaQuestionCircle },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-full bg-white shadow-lg z-40 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Menu</h2>
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.path}
                        className={`flex items-center p-2 rounded-lg transition-colors duration-200
                          ${location.pathname === item.path
                            ? 'bg-blue-100 text-blue-600'
                            : 'hover:bg-gray-100'
                          }`}
                        onClick={() => window.innerWidth <= 768 && setIsOpen(false)}
                      >
                        <item.icon className="mr-3" />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};
export default Sidebar;

