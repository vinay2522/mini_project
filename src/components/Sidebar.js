import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaAmbulance, FaHospital, FaBlog, FaImages, FaDownload, FaQuestionCircle } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FaHome, text: 'Home' },
    { path: '/services', icon: FaAmbulance, text: 'Services' },
    { path: '/hospitals', icon: FaHospital, text: 'Hospitals' },
    { path: '/blog', icon: FaBlog, text: 'Blog' },
    { path: '/gallery', icon: FaImages, text: 'Gallery' },
    { path: '/download', icon: FaDownload, text: 'Download' },
    { path: '/help-desk', icon: FaQuestionCircle, text: 'Help Desk' },
  ];

  return (
    <aside className="bg-red-100 w-16 md:w-64 min-h-screen p-4 transition-all duration-300">
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-red-200 ${
                  location.pathname === item.path ? 'bg-red-200 text-red-600' : 'text-gray-700'
                }`}
              >
                <item.icon className="mr-2 text-xl" />
                <span className="hidden md:inline">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
