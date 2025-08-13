import React from 'react';
import TradingViewWidget from '../components/TradingViewWidget';

const ChartModal = ({ isOpen, onClose, symbol, name }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-600/20 w-[90vw] max-w-4xl h-[70vh] max-h-[600px] p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-white mb-4">
          {name} ({symbol}) Price Chart
        </h2>
        <div className="w-full h-[calc(100%-48px)]">
          <TradingViewWidget symbol={symbol} />
        </div>
      </div>
    </div>
  );
};

export default ChartModal;