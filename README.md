# ⚡ BlockPulse 

A premium, real-time cryptocurrency tracking dashboard built entirely with Vanilla JavaScript, HTML, and CSS. Designed with a professional SaaS sidebar architecture and a modern "glassmorphism" UI, BlockPulse fetches live market data for the top 250 cryptocurrencies and dynamically updates the DOM to mirror the mechanics of a modern Single Page Application (SPA).

## 🚀 Core Features

*   **Premium SaaS Architecture:** Features a fixed sidebar control panel and an independent scrolling data view, mimicking industry-standard enterprise financial applications.
*   **Modern UI/UX & Animations:** Implemented a "glassmorphism" design system (frosted glass modals), CSS skeleton loaders, and a cascading staggered entrance animation for data cards.
*   **High-Volume API Integration:** Efficiently fetches, parses, and renders real-time data, including live prices, 24h percentage changes, and official coin logos via the CoinGecko API v3.
*   **Interactive 7-Day Charts:** Integrates **Chart.js** to render responsive, interactive line graphs displaying historical price trends inside a frosted-glass modal.
*   **Quick Conversion Calculator:** Features a dynamic calculator widget that allows users to instantly multiply live market prices by custom holding amounts across 250 different assets.
*   **Global Currency & Sorting Engine:** Dynamically manipulates API endpoint parameters to fetch data in USD ($), EUR (€), or INR (₹), and features client-side array sorting (`.sort()`) for Top Gainers, Losers, and Price thresholds.

## 💾 Local Storage & State Management

BlockPulse utilizes the Web Storage API (`localStorage`) heavily to create a personalized, database-free user experience:
*   **Personalized Welcome Overlay:** Intercepts first-time users with a login modal to capture their name, saving it locally to inject a personalized greeting into the sidebar on future visits.
*   **Automated Portfolio Engine:** Users can "Track" specific coins and input their holdings. The app saves this state and calculates real-time net worth by cross-referencing saved quantities with live market prices.
*   **Persistent Theme Toggle:** Features a dynamic Light/Dark mode switcher powered by CSS variables that remembers user preferences across sessions.

## 🛠️ Tech Stack

*   **Structure:** HTML5 (Semantic layout, Sidebar/Main architecture)
*   **Styling:** CSS3 (Flexbox layout, CSS variables, Glassmorphism blur effects, Keyframe animations, Responsive design)
*   **Logic:** Vanilla JavaScript / ES6+ (Asynchronous fetching, array methods, DOM event delegation, Web Storage API)
*   **Libraries:** Chart.js (via CDN)
*   **API:** CoinGecko API v3

## ⚙️ How to Run Locally

1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/Srushti2510/live-crypto-dashboard.git](https://github.com/Srushti2510/live-crypto-dashboard.git)