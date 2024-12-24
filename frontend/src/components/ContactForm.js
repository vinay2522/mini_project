import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/contact`, { name, email, message });
      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error('Message sending failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setSuccess(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">Message sent successfully!</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

