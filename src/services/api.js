import axios from 'axios';


const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const KLINES_API_URL = 'https://api.binance.com/api/v3/klines';


export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(BINANCE_API_URL);

    const cryptoData = response.data
      .filter(item => item.symbol.endsWith('USDT') && parseFloat(item.lastPrice) >= 0.01)
      .map(item => {
        const symbol = item.symbol.replace('USDT', '');
        return {
          id: symbol,
          name: getCryptoName(symbol),
          symbol: symbol,
          price: parseFloat(item.lastPrice),
          change: parseFloat(item.priceChangePercent),
          volume: parseFloat(item.volume),
          marketCap: calculateMarketCap(symbol, parseFloat(item.lastPrice))
        };
      })
      .slice(0, 60);

    return cryptoData;
  } catch (error) {
    console.error('Error fetching Binance data:', error.message);
    return getFallbackData();
  }
};

export const fetchPriceHistory = async (symbol, interval = '1h', limit = 24) => {
  try {
    const response = await axios.get(KLINES_API_URL, {
      params: {
        symbol: `${symbol}USDT`,
        interval,
        limit
      }
    });

    return response.data.map(kline => ({
      time: new Date(kline[0]).toLocaleTimeString(),
      price: parseFloat(kline[4]) // قیمت بسته شدن
    }));
  } catch (error) {
    console.error(`Error fetching price history for ${symbol}:`, error.message);
    return getMockPriceHistory(symbol);
  }
};

const getCryptoName = (symbol) => {
  const names = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    BNB: 'Binance Coin',
    DOGE: 'Dogecoin',
    ADA: 'Cardano',
    XRP: 'Ripple',
    SOL: 'Solana',
    DOT: 'Polkadot',
    MATIC: 'Polygon',
    TRX: 'Tron',
    LINK: 'Chainlink',
    AVAX: 'Avalanche',
    LTC: 'Litecoin',
    UNI: 'Uniswap',
    XLM: 'Stellar',
    BCH: 'Bitcoin Cash',
    ALGO: 'Algorand',
    VET: 'VeChain',
    ATOM: 'Cosmos',
    XTZ: 'Tezos',
    EOS: 'EOS',
    AAVE: 'Aave',
    THETA: 'Theta',
    FIL: 'Filecoin',
    CRO: 'Crypto.com Coin',
    XMR: 'Monero',
    CAKE: 'PancakeSwap',
    FTM: 'Fantom',
    GRT: 'The Graph',
    KSM: 'Kusama',
    RUNE: 'THORChain',
    HBAR: 'Hedera',
    NEO: 'NEO',
    MIOTA: 'IOTA',
    ZEC: 'Zcash',
    DASH: 'Dash',
    WAVES: 'Waves',
    ONE: 'Harmony',
    CHZ: 'Chiliz',
    STX: 'Stacks',
    ENJ: 'Enjin Coin',
    FLOW: 'Flow',
    SAND: 'The Sandbox',
    MANA: 'Decentraland',
    AXS: 'Axie Infinity',
    CRV: 'Curve DAO Token',
    BAT: 'Basic Attention Token',
    SUSHI: 'SushiSwap',
    LRC: 'Loopring',
    OMG: 'OMG Network',
    ZIL: 'Zilliqa',
    SNX: 'Synthetix',
    COMP: 'Compound',
    YFI: 'yearn.finance',
    KAVA: 'Kava',
    QNT: 'Quant',
    DCR: 'Decred',
    ICX: 'ICON',
    AR: 'Arweave',
    CELO: 'Celo',
    KLAY: 'Klaytn'
  };
  return names[symbol] || symbol;
};

// محاسبه مارکت کپ (فرضی)
const calculateMarketCap = (symbol, price) => {
  const supply = {
    BTC: 19500000,
    ETH: 120000000,
    BNB: 150000000,
    DOGE: 145000000000,
    ADA: 45000000000,
    XRP: 100000000000,
    SOL: 580000000,
    DOT: 1470000000,
    MATIC: 10000000000,
    TRX: 87000000000,
    LINK: 1000000000,
    AVAX: 440000000,
    LTC: 84000000,
    UNI: 1000000000,
  };
  return (supply[symbol] || 0) * price;
};

const getFallbackData = () => [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', price: 60000, change: 1.2, volume: 350000, marketCap: 1170000000000 },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH', price: 4000, change: -0.5, volume: 250000, marketCap: 480000000000 },
  { id: 'BNB', name: 'Binance Coin', symbol: 'BNB', price: 500, change: 0.8, volume: 150000, marketCap: 75000000000 },
  { id: 'ADA', name: 'Cardano', symbol: 'ADA', price: 1.5, change: -1.0, volume: 1200000, marketCap: 67500000000 },
  { id: 'XRP', name: 'Ripple', symbol: 'XRP', price: 0.8, change: 0.4, volume: 3000000, marketCap: 80000000000 },
  { id: 'SOL', name: 'Solana', symbol: 'SOL', price: 150, change: 1.5, volume: 800000, marketCap: 87000000000 },
  { id: 'DOT', name: 'Polkadot', symbol: 'DOT', price: 20, change: -0.3, volume: 600000, marketCap: 29400000000 },
  { id: 'MATIC', name: 'Polygon', symbol: 'MATIC', price: 1.2, change: 0.9, volume: 1500000, marketCap: 12000000000 },
  { id: 'TRX', name: 'Tron', symbol: 'TRX', price: 0.12, change: 0.2, volume: 4000000, marketCap: 10440000000 },
  { id: 'LINK', name: 'Chainlink', symbol: 'LINK', price: 25, change: -0.7, volume: 700000, marketCap: 25000000000 },
  { id: 'AVAX', name: 'Avalanche', symbol: 'AVAX', price: 50, change: 1.8, volume: 500000, marketCap: 22000000000 },
  { id: 'LTC', name: 'Litecoin', symbol: 'LTC', price: 100, change: -0.4, volume: 800000, marketCap: 8400000000 }
];

const getMockPriceHistory = (symbol) => {
  const basePrice = getFallbackData().find(c => c.symbol === symbol)?.price || 100;
  return Array.from({ length: 24 }, (_, i) => ({
    time: new Date(Date.now() - (23 - i) * 3600 * 1000).toLocaleTimeString(),
    price: basePrice * (1 + (Math.random() - 0.5) * 0.1)
  }));
};