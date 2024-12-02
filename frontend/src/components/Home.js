import React from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { FaAmbulance, FaUserMd, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Section from './Section';
import MissionSection from './MissionSection';
import ContactForm from './ContactForm';

const Home = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/booking');
  };

  return (
    <Section id="home" title="Home">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="hero gradient-bg text-white p-8 rounded-lg mb-8">
          <h2 className="text-4xl font-bold mb-4 text-shadow">
            Your Emergency,Our Priority
          </h2>
          <p className="text-2xl mb-4 pulse-animation">GIVE WAY TO AMBULANCE</p>
          <p className="mb-4 text-lg">
            24/7 emergency & medical transportation support. Ensuring professional medical care throughout the journey.
          </p>
        </section>

        {/* Book Now Section */}
        <section className="book-now-section bg-white p-8 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold mb-4 text-red-600">Emergency Booking</h3>
            <p className="text-lg mb-4 text-gray-700">
              Need an ambulance urgently? Book now and get immediate assistance.
            </p>
            <button
              onClick={handleBookNow}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 cursor-pointer hover-scale inline-block"
            >
              Book Now
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img
              src="/images/ambulance.gif"
              alt="Ambulance"
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* About Us Section */}
        <Element name="about">
          <Section id="about" title="About Us" className="mb-8 rounded-lg shadow-lg p-8 bg-gray-50">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">About Us</h2>
              <p className="text-lg mb-6 text-gray-700">
                Welcome to <strong className="text-red-500">SevaDrive</strong>, your trusted partner in emergency medical services. 
                We are a dedicated team of healthcare professionals and drivers united by a mission to save lives and provide 
                compassionate care during medical emergencies.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {/* About Mission */}
              <div className="max-w-sm p-4 rounded-md shadow-md border-t-4 border-blue-500 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Our Mission</h3>
                <p className="text-gray-600">
                  To deliver prompt, professional, and compassionate ambulance services, ensuring every patient receives the care they deserve, 
                  every step of the way.
                </p>
              </div>

              {/* About Services */}
              <div className="max-w-sm p-4 rounded-md shadow-md border-t-4 border-green-500 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">What We Offer</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Basic Life Support (BLS) Ambulances</li>
                  <li>Advanced Cardiac Life Support (ACLS) Ambulances</li>
                  <li>Neonatal & Pediatric Transfers</li>
                  <li>Pet Ambulance Services</li>
                  <li>Long-distance and Inter-city Transfers</li>
                </ul>
              </div>

              {/* About Features */}
              <div className="max-w-sm p-4 rounded-md shadow-md border-t-4 border-orange-500 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Why Choose Us?</h3>
                <div className="mt-4 flex items-center gap-4">
                  <FaAmbulance className="text-4xl text-red-600" />
                  <p className="text-gray-600">Modern and well-equipped ambulances for any emergency.</p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <FaUserMd className="text-4xl text-red-600" />
                  <p className="text-gray-600">Expert medical staff ensuring quality care.</p>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <FaPhoneAlt className="text-4xl text-red-600" />
                  <p className="text-gray-600">24/7 helpline for round-the-clock assistance.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Who We Are</h3>
              <p className="text-lg mb-6 text-gray-700">
                At SevaDrive, we strive to redefine emergency medical transportation by ensuring every journey is safe, efficient, and comfortable. 
                Our team is driven by innovation and compassion to bridge the gap between medical emergencies and timely care.
              </p>
              <img
                src="/images/ambulance.webp"
                alt="Dedicated Ambulance Team"
                className="mt-4 mx-auto w-full max-w-md rounded-lg shadow-md"
              />
              <p className="text-lg font-medium mt-6 text-gray-800">
                Join us in creating a safer, healthier tomorrow. Let SevaDrive be your trusted partner in times of need.
              </p>
            </div>
          </Section>
        </Element>

        {/* Contact Section */}
        <Element name="contact">
          <Section id="contact" title="Connect With Us" className="mb-8">
            <ContactForm />
          </Section>
        </Element>
      </div>
    </Section>
  );
};

export default Home;