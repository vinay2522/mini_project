import React, { useState } from 'react';
import { FaQuestionCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{question}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const HelpDesk = () => {
  const faqs = [
    {
      question: "How do I request an ambulance?",
      answer: "You can request an ambulance by calling our emergency number or using our mobile app."
    },
    {
      question: "What information should I provide when calling for an ambulance?",
      answer: "Provide your location, nature of the emergency, and any relevant medical information."
    },
    {
      question: "How long does it typically take for an ambulance to arrive?",
      answer: "Our average response time is 10-15 minutes, depending on your location and traffic conditions."
    },
    {
      question: "Do you offer non-emergency medical transportation?",
      answer: "Yes, we offer non-emergency medical transportation services. Please contact us for more information."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Help Desk</h2>
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <div className="flex flex-col space-y-4">
            <a href="mailto:support@sevadrive.com" className="flex items-center text-blue-600 hover:text-blue-800">
              <FaEnvelope className="mr-2" />
              support@sevadrive.com
            </a>
            <a href="tel:+919632598430" className="flex items-center text-blue-600 hover:text-blue-800">
              <FaPhone className="mr-2" />
              +91 9632598430
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
