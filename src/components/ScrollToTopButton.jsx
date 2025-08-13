import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`fixed bottom-4 right-4 p-3 rounded-full bg-gradient-to-r from-gray-800/90 to-blue-900/90 backdrop-blur-md border border-gray-600/20 shadow-[0_4px_12px_rgba(0,0,0,0.3)] text-gray-200 hover:text-white hover:bg-blue-700/80 transition-all duration-300 ease-in-out transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      } md:bottom-6 md:right-6 z-50`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;