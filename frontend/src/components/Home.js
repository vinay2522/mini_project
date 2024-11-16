import React, { startTransition } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { FaAmbulance, FaUserMd, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Section from './Section';
import MissionSection from './MissionSection';

const Home = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    startTransition(() => {
      navigate('/booking');
    });
  };

  return (
    <Section id="home" title="Home">
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="hero gradient-bg text-white p-8 rounded-lg">
          <h2 className="text-4xl font-bold mb-4 text-shadow">
            DRIVING CARE IN HEALTHCARE across Tumakuru
          </h2>
          <p className="text-2xl mb-4 pulse-animation">GIVE WAY TO AMBULANCE</p>
          <p className="mb-4 text-lg">
            24/7 emergency & medical transportation support. Ensuring professional medical care throughout the journey.
          </p>
          <button
            onClick={handleBookNow}
            className="bg-white text-red-600 px-6 py-2 rounded hover:bg-red-100 cursor-pointer hover-scale inline-block"
          >
            Book Now
          </button>
        </section>

        {/* About Us Section */}
        <Element name="about">
          <Section id="about" title="About Us">
            <p className="text-lg">
              SevaDrive is committed to providing high-quality ambulance services in Tumakuru. Our team of trained
              professionals ensures that patients receive the best care during transportation.
            </p>
            <div className="mt-6 flex justify-around">
              <div className="text-center">
                <FaAmbulance className="text-4xl text-red-600 mx-auto mb-2" />
                <p>Modern Ambulances</p>
              </div>
              <div className="text-center">
                <FaUserMd className="text-4xl text-red-600 mx-auto mb-2" />
                <p>Expert Medical Staff</p>
              </div>
              <div className="text-center">
                <FaPhoneAlt className="text-4xl text-red-600 mx-auto mb-2" />
                <p>24/7 Support</p>
              </div>
            </div>
            <MissionSection />
          </Section>
        </Element>

        {/* Who We Are Section */}
        <Element name="who-we-are">
          <Section id="who-we-are" title="Who We Are">
            <p className="text-lg">
              We are a dedicated team of healthcare professionals and drivers working together to provide timely and
              efficient ambulance services. Our mission is to save lives and ensure patient comfort during medical
              emergencies.
            </p>
          </Section>
        </Element>

        {/* Contact Section */}
        <Element name="contact">
          <Section id="contact" title="Connect With Us">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Name
                </label>
                <input type="text" id="name" className="w-full p-2 border rounded text-gray-800" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input type="email" id="email" className="w-full p-2 border rounded text-gray-800" />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1">
                  Message
                </label>
                <textarea id="message" rows="4" className="w-full p-2 border rounded text-gray-800"></textarea>
              </div>
              <button type="submit" className="bg-white text-red-600 px-6 py-2 rounded hover:bg-red-100 hover-scale">
                Send
              </button>
            </form>
          </Section>
        </Element>
      </div>
    </Section>
  );
};

export default Home;