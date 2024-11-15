import React, { Suspense, useState, startTransition } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
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
import './styles/global.css';
import i18n from './i18n';

const App = () => {
  const { darkMode, toggleDarkMode } = useTheme();
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

  const changeLanguage = (lng) => {
    startTransition(() => {
      i18n.changeLanguage(lng);
    });
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          {/* Sidebar */}
          <motion.div
            animate={{
              width: isOpen ? "16rem" : "4rem",
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              damping: 10,
            }}
            className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 shadow-lg z-50 
              ${darkMode ? 'dark:border-r dark:border-gray-700' : 'border-r border-gray-200'}`}
          >
            <div className="flex flex-col h-full">
              {/* Logo and Toggle */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <img
                    src="/logo.png"
                    alt="SevaDrive Logo"
                    className="w-10 h-10 rounded-full"
                  />
                  {isOpen && (
                    <span className="ml-2 font-bold text-xl dark:text-white">
                      SevaDrive
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                    transition-colors duration-200"
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
                    className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 
                      hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
                      ${!isOpen && 'justify-center'}`}
                  >
                    <Link to={item.path} className={`${!isOpen && 'hidden'} ml-2`}>
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Language and Theme Toggles */}
              <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`flex ${isOpen ? 'justify-between' : 'justify-center'} mb-2`}>
                  {isOpen && (
                    <>
                      <button
                        onClick={() => changeLanguage('en')}
                        className="px-2 py-1 text-sm rounded hover:bg-gray-100 
                          dark:hover:bg-gray-700 transition-colors"
                      >
                        EN
                      </button>
                      <button
                        onClick={() => changeLanguage('fr')}
                        className="px-2 py-1 text-sm rounded hover:bg-gray-100 
                          dark:hover:bg-gray-700 transition-colors"
                      >
                        FR
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-full p-2 rounded-lg hover:bg-gray-100 
                    dark:hover:bg-gray-700 transition-colors text-sm
                    ${!isOpen && 'p-2'}`}
                >
                  {isOpen ? (darkMode ? 'Light Mode' : 'Dark Mode') : '🌓'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
            <Header />
            <main className="min-h-screen p-4">
              <Suspense fallback={<LoadingSpinner />}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/services" component={Services} />
                  <Route path="/hospitals" component={Hospitals} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/gallery" component={Gallery} />
                  <Route path="/download" component={Download} />
                  <Route path="/helpdesk" component={HelpDesk} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
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
