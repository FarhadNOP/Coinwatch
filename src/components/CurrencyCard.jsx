import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler } from 'chart.js';
import { fetchPriceHistory } from '../services/api';
import ChartModal from './ChartModal';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

const CurrencyCard = ({ crypto }) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadPriceHistory = async () => {
      const cached = localStorage.getItem(`priceHistory_${crypto.symbol}`);
      if (cached) {
        setPriceHistory(JSON.parse(cached));
        return;
      }

      const history = await fetchPriceHistory(crypto.symbol);
      setPriceHistory(history);
      localStorage.setItem(`priceHistory_${crypto.symbol}`, JSON.stringify(history));
    };
    loadPriceHistory();
  }, [crypto.symbol]);

  if (!crypto) return null;

  const change = Number(crypto.change ?? 0);
  const ChangeIcon = change >= 0 ? FaArrowUp : FaArrowDown;
  const changeColor = change >= 0 ? 'bg-green-500/20 text-green-400 border-green-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40';

  const price = Number(crypto.price ?? 0);
  const volume = Number(crypto.volume ?? 0);
  const marketCap = Number(crypto.marketCap ?? 0);

  const iconSrc = crypto.symbol
    ? `/node_modules/cryptocurrency-icons/svg/color/${crypto.symbol.toLowerCase()}.svg`
    : '/icons/default-crypto.svg';

  const chartData = {
    labels: priceHistory.map(data => data.time),
    datasets: [
      {
        label: 'Price (USDT)',
        data: priceHistory.map(data => data.price),
        borderColor: change >= 0 ? '#34d399' : '#f87171',
        backgroundColor: change >= 0 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#d1d5db',
        cornerRadius: 8,
      },
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false, beginAtZero: false },
    },
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-56 h-80 bg-white/5 backdrop-blur-md rounded-xl shadow-xl border border-white/10 hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] p-4 flex flex-col justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20 shadow-inner">
            <img
              src={iconSrc}
              alt={`${crypto.name} icon`}
              className="w-8 h-8 object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
              onError={(e) => { e.currentTarget.src = '/icons/default-crypto.svg'; }}
            />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{crypto.name || 'Unknown'}</h3>
            <p className="text-gray-400 text-xs uppercase">{crypto.symbol || '--'}</p>
          </div>
        </div>

        <div>
          <p className="text-white font-bold text-2xl">
            ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className={`inline-flex items-center mt-2 px-2 py-1 rounded-lg text-sm font-medium border ${changeColor}`}>
            <ChangeIcon className="mr-1" />
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </div>
        </div>

        <div className="h-16 mt-2">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="text-gray-400 text-xs border-t border-white/10 pt-3">
          <div className="flex justify-between mb-1">
            <span>Volume:</span>
            <span>${(volume / 1_000_000).toFixed(2)}M</span>
          </div>
          <div className="flex justify-between">
            <span>Market Cap:</span>
            <span>${(marketCap / 1_000_000_000).toFixed(2)}B</span>
          </div>
        </div>
      </button>

      <ChartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        symbol={crypto.symbol}
        name={crypto.name}
      />
    </>
  );
};

export default CurrencyCard;