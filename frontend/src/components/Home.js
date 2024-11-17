import React, { startTransition } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { FaAmbulance, FaUserMd, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Section from './Section';
import MissionSection from './MissionSection';
import ContactForm from './ContactForm'; // Import the ContactForm component

const Home = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    startTransition(() => {
      navigate('/booking');
    });
  };

  return (
    <Section id="home" title="Home">
      <div className="space-y-8"> {/* Reduced gap between sections */}
        {/* Hero Section */}
        <section className="hero gradient-bg text-white p-8 rounded-lg mb-8"> {/* Added mb-8 for bottom margin */}
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
  <Section id="about" title="About Us" className="mb-8 bg-gray-50 rounded-lg shadow-lg p-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">About Us</h2>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to <strong className="text-red-500">SevaDrive</strong>, your trusted partner in emergency medical services. 
        We are a dedicated team of healthcare professionals and drivers united by a mission to save lives and provide 
        compassionate care during medical emergencies.
      </p>
    </div>

    <div className="flex flex-wrap justify-center gap-6">
      {/* About Mission */}
      <div className="max-w-sm p-4 bg-white rounded-md shadow-md border-t-4 border-blue-500">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
        <p className="text-gray-600">
          To deliver prompt, professional, and compassionate ambulance services, ensuring every patient receives the care they deserve, 
          every step of the way.
        </p>
      </div>

      {/* About Services */}
      <div className="max-w-sm p-4 bg-white rounded-md shadow-md border-t-4 border-green-500">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">What We Offer</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Basic Life Support (BLS) Ambulances</li>
          <li>Advanced Cardiac Life Support (ACLS) Ambulances</li>
          <li>Neonatal & Pediatric Transfers</li>
          <li>Pet Ambulance Services</li>
          <li>Long-distance and Inter-city Transfers</li>
        </ul>
      </div>

      {/* About Features */}
      <div className="max-w-sm p-4 bg-white rounded-md shadow-md border-t-4 border-orange-500">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Choose Us?</h3>
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
      <h3 className="text-2xl font-bold text-blue-600 mb-4">Who We Are</h3>
      <p className="text-lg text-gray-700 mb-6">
        At SevaDrive, we strive to redefine emergency medical transportation by ensuring every journey is safe, efficient, and comfortable. 
        Our team is driven by innovation and compassion to bridge the gap between medical emergencies and timely care.
      </p>
      <img
        src="/images/ambulance.webp"
        alt="Dedicated Ambulance Team"
        className="mt-4 mx-auto w-full max-w-md rounded-lg shadow-md"
      />
      <p className="text-lg font-medium text-gray-800 mt-6">
        Join us in creating a safer, healthier tomorrow. Let SevaDrive be your trusted partner in times of need.
      </p>
    </div>
  </Section>
</Element>



        {/* Contact Section */}
        <Element name="contact">
          <Section id="contact" title="Connect With Us" className="mb-8"> {/* Added mb-8 for bottom margin */}
            <ContactForm />
          </Section>
        </Element>
      </div>
    </Section>
  );
};

export default Home;