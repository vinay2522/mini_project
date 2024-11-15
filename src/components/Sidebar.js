// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <motion.div
        animate={{
          width: isOpen ? '16rem' : '4rem',
          transition: { duration: 0.3 },
        }}
        className="sidebar"
      >
        <button onClick={toggleSidebar}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Sidebar;