import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or update UI
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto card"
      >
        <h2 className="section-title text-center mb-8">{t('login.title')}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">{t('login.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">{t('login.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {t('login.submit')}
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link to="/forgot-password" className="text-seva-red dark:text-seva-blue hover:underline">
            {t('login.forgotPassword')}
          </Link>
        </p>
        <p className="mt-4 text-center">
          {t('login.noAccount')} <Link to="/register" className="text-seva-red dark:text-seva-blue hover:underline">{t('login.register')}</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;