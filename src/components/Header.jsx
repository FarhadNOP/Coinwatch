import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="w-full py-3 bg-gradient-to-r from-gray-800/90 via-gray-900/90 to-gray-800/90 backdrop-blur-lg border-b border-gray-600/20 shadow-[0_6px_20px_rgba(0,0,0,0.25)] fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">

        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-300 tracking-tight cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(100,150,255,0.4)]">
          CoinWatch
        </Link>
        <nav className="hidden md:flex space-x-6 text-gray-300 font-medium">
          {['Prices', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Prices' ? '/' : `/${item.toLowerCase()}`}
              className={`relative px-3 py-1 rounded-lg text-sm uppercase tracking-wide transition-all duration-300 group hover:bg-gray-700/20 hover:text-gray-100 ${
                location.pathname === (item === 'Prices' ? '/' : `/${item.toLowerCase()}`) ? 'text-gray-100 bg-gray-700/20' : ''
              }`}
            >
              {item}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-gray-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden text-gray-300 hover:text-gray-100 transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <nav
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-lg border-t border-gray-600/20 mt-2`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-4 flex flex-col space-y-3">
          {['Prices', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Prices' ? '/' : `/${item.toLowerCase()}`}
              className={`text-gray-300 font-medium px-3 py-2 rounded-lg text-center uppercase tracking-wide hover:bg-gray-700/20 hover:text-gray-100 transition-all duration-300 ${
                location.pathname === (item === 'Prices' ? '/' : `/${item.toLowerCase()}`) ? 'text-gray-100 bg-gray-700/20' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;