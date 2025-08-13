import React from 'react';
import Header from '../components/Header';
import ScrollToTopButton from '../components/ScrollToTopButton';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950 text-white flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-6 mt-16">
        <section className="bg-white/5 backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-300 mb-4">
            About CoinWatch
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            CoinWatch is your go-to platform for tracking real-time cryptocurrency prices, trends, and market data. Powered by Binance's robust API, we provide accurate and up-to-date information on over 60 cryptocurrencies, helping you stay ahead in the fast-paced world of digital assets.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our mission is to make crypto data accessible and visually appealing, with a sleek, modern interface designed for both beginners and seasoned traders. Explore prices, analyze trends, and stay informed with CoinWatch.
          </p>
        </section>
      </main>
      <ScrollToTopButton />
    </div>
  );
};

export default About;