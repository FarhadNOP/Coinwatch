import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isMounted.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      allow_symbol_change: true,
      calendar: false,
      details: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      hotlist: false,
      interval: 'D',
      locale: 'en',
      save_image: true,
      style: '1',
      symbol: `BINANCE:${symbol}USDT`,
      theme: 'dark',
      timezone: 'Etc/UTC',
      backgroundColor: '#111827',
      gridColor: 'rgba(255, 255, 255, 0.1)',
      watchlist: [],
      withdateranges: true,
      compareSymbols: [],
      studies: [],
      autosize: true,
    });

    containerRef.current.appendChild(script);
    isMounted.current = true;

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      isMounted.current = false;
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
      <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
      <div className="tradingview-widget-copyright">
        <a href={`https://www.tradingview.com/symbols/BINANCE-${symbol}USDT/?exchange=BINANCE`} rel="noopener nofollow" target="_blank">
          <span className="text-blue-400">{`${symbol}USDT chart by TradingView`}</span>
        </a>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);