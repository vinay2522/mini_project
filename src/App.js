import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import React, { startTransition } from 'react';
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

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <Header />
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
        <Footer />
      </div>
    </Router>
  );
};

export default App;