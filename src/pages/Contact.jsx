import React, { useState } from 'react';
import Header from '../components/Header';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950 text-white flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-6 mt-16">
        <section className="bg-white/5 backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-300 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Have questions or feedback? Fill out the form below, and our team will get in touch with you!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300 font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Your message"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
      <ScrollToTopButton />
    </div>
  );
};

export default Contact;