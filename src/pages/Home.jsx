import React, { useState, useEffect } from 'react';
import { fetchCryptoData } from '../services/api';
import CurrencyCard from '../components/CurrencyCard';
import Header from '../components/Header';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { CirclesWithBar } from 'react-loader-spinner';

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState('connecting');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('none');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setApiStatus('fetching');

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const data = await fetchCryptoData();
        setCryptos(data);
        setApiStatus(data.length === 0 ? 'using_fallback' : 'live');
      } catch (error) {
        console.error('Load error:', error);
        setApiStatus('error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 300000);
    return () => clearInterval(interval);
  }, []);

  // فیلتر و مرتب‌سازی ارزها
  const filteredCryptos = cryptos
    .filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === 'highest_volume') {
        return b.volume - a.volume; 
      } else if (filter === 'highest_gain') {
        return b.change - a.change; 
      } else if (filter === 'highest_loss') {
        return a.change - b.change; 
      }
      return 0; 
    });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950 text-white flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-4 py-6 mt-16">
        <div className="mb-6 max-w-4xl mx-auto space-y-4">
          <input
            type="text"
            placeholder="Search by name or symbol (e.g., Bitcoin, BTC)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <div className="flex flex-wrap gap-2 justify-start">
            <button
              onClick={() => setFilter('none')}
              className={filter === 'none' ? 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-blue-600 text-white border-blue-400 border' : 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-gray-800/50 text-gray-300 border-gray-600/20 hover:bg-gray-700/50 hover:text-white border'}
            >
              No Filter
            </button>
            <button
              onClick={() => setFilter('highest_volume')}
              className={filter === 'highest_volume' ? 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-blue-600 text-white border-blue-400 border' : 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-gray-800/50 text-gray-300 border-gray-600/20 hover:bg-gray-700/50 hover:text-white border'}
            >
              Highest Volume
            </button>
            <button
              onClick={() => setFilter('highest_gain')}
              className={filter === 'highest_gain' ? 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-blue-600 text-white border-blue-400 border' : 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-gray-800/50 text-gray-300 border-gray-600/20 hover:bg-gray-700/50 hover:text-white border'}
            >
              Highest Gain
            </button>
            <button
              onClick={() => setFilter('highest_loss')}
              className={filter === 'highest_loss' ? 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-blue-600 text-white border-blue-400 border' : 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-gray-800/50 text-gray-300 border-gray-600/20 hover:bg-gray-700/50 hover:text-white border'}
            >
              Highest Loss
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <CirclesWithBar
              height="100"
              width="100"
              color="#4fa94d"
              outerCircleColor="#4fa94d"
              innerCircleColor="#4fa94d"
              barColor="#4fa94d"
              ariaLabel="circles-with-bar-loading"
              visible={true}
            />
          </div>
        ) : (
          <>
            {apiStatus === 'using_fallback' && (
              <div className="mb-6 px-5 py-3 bg-yellow-600 text-yellow-100 rounded shadow-lg max-w-4xl mx-auto">
                Showing sample data (API not available)
              </div>
            )}
            {filteredCryptos.length === 0 && searchTerm && (
              <div className="text-center text-gray-400 py-10">
                No cryptocurrencies found matching "{searchTerm}"
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-3 max-w-5xl mx-auto">
              {filteredCryptos.map((crypto) => (
                <CurrencyCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          </>
        )}
      </main>
      <ScrollToTopButton />
    </div>
  );
};

export default Home;