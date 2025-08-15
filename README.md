CoinWatch
CoinWatch is a cryptocurrency tracking platform designed to provide real-time price updates and market analysis for various cryptocurrencies. This repository contains two versions of the project:

Version 1: A lightweight, static implementation built with Vanilla JavaScript, HTML, and CSS, featuring a simple UI for displaying trending cryptocurrency prices and basic project information.
Version 2: A modern, dynamic web application built with React, featuring advanced functionalities like real-time price updates, interactive charts, filtering, and a responsive design with a sleek glassmorphism UI.


About the Project
CoinWatch is a platform designed to help users track cryptocurrency prices and stay updated with market trends. The project has evolved from a simple static webpage (Version 1) to a fully interactive web application (Version 2) with enhanced features and a modern UI.

Version 1 (Vanilla JS): A basic webpage that displays static cryptocurrency prices (e.g., Bitcoin, Ethereum, Cardano, etc.) with a simple navigation bar and footer containing project information, social links, and contact details.
Version 2 (React): A dynamic application that fetches real-time data from the Binance API, displays interactive price charts, and includes features like search, filtering, and pop-up charts powered by TradingView.


Features
Version 1 (Vanilla JS)

Static display of trending cryptocurrency prices (Bitcoin, Ethereum, Cardano, Litecoin, Binance Coin, Matic, Solana, NOT Coin, Ton Coin), allowing users to view key market data without needing an internet connection.
Simple navigation bar with links to Home, News, and About Us sections for easy exploration of the site.
Footer with quick links (Home, About Us, Contact, FAQ), social media icons (Telegram, Twitter, Instagram, LinkedIn), and contact information (email and phone), providing users with quick access to support and updates.
Clean and minimal design with a focus on usability, featuring a responsive layout for desktop and mobile devices.
Offline accessibility: Fully functional without an internet connection, making it lightweight and ideal for quick reference in any environment.

Version 2 (React)

Real-time Data: Fetches live cryptocurrency prices from the Binance API for over 60 cryptocurrencies, with automatic updates every 5 minutes and fallback to sample data if the API is unavailable.
Interactive Charts: Displays mini price charts on each crypto card using Chart.js for quick trend visualization, and detailed pop-up charts using TradingView with blurred background for focused analysis.
Search and Filter: Allows users to search by name or symbol and filter by highest volume, highest gain, or highest loss using horizontal buttons, with dynamic sorting for personalized views.
Responsive Design: Fully responsive UI with a glassmorphism aesthetic (backdrop-blur, gradients) optimized for mobile and desktop, including a sticky header and scroll-to-top button for smooth navigation.
Pop-up Modal: Clicking on a crypto card opens a modal with a detailed TradingView chart, including timeframe selection, tools, and dark theme integration for an immersive experience.
Navigation: Includes Home, About, and Contact pages with a sticky header, where About provides project details and Contact features a simple form for user feedback.
Caching and Optimization: Uses LocalStorage for caching price history to reduce API calls, and lazy loading for charts to improve performance on large datasets.
Error Handling: Displays user-friendly messages for API errors and uses sample data as fallback, ensuring the app remains usable even during outages.


Technologies Used
Version 1 (Vanilla JS)

- HTML5
- CSS3
- Vanilla JavaScript

Version 2 (React)

- Frontend: React, React Router, Tailwind CSS
- Data Fetching: Axios (for Binance API)
- Charts: Chart.js (mini charts), TradingView Widget (detailed charts)
- Icons: React Icons, Cryptocurrency Icons
- Loading Animation: React Loader Spinner
- Others: LocalStorage for caching price history
Screenshots 
Version 1 (Vanilla JS): 
<img width="1360" height="641" alt="1" src="https://github.com/user-attachments/assets/ffb7a62f-543d-4022-af58-7af89c989247" />
Static homepage displaying trending crypto prices


Version 2 (React):
<img width="1360" height="641" alt="2" src="https://github.com/user-attachments/assets/96f9926f-a306-44a1-b65d-2c5f91eda276" />
Interactive homepage with crypto cards and filters and Pop-up TradingView chart with blurred background


