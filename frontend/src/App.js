import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import LoadingSpinner from './components/LoadingSpinner';
import BookingForm from './components/BookingForm';
import Sidebar from './components/Sidebar';
import WhatsAppButton from './components/WhatsAppButton';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Profile = React.lazy(() => import('./components/Profile'));
const PrivateRoute = React.lazy(() => import('./components/PrivateRoute'));

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen">
            <Sidebar />
            <div className="transition-all duration-300 ml-64 md:ml-64">
              <Header />
              <main className="min-h-screen p-4">
                <Suspense fallback={<LoadingSpinner fullScreen />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/hospitals" element={<Hospitals />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/download" element={<Download />} />
                    <Route path="/helpdesk" element={<HelpDesk />} />
                    <Route path="/booking" element={<BookingForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
            <WhatsAppButton phoneNumber="+919632598430" />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
