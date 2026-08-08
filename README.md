# 📈 Live Crypto Dashboard

A high-performance, real-time cryptocurrency tracking dashboard built entirely with Vanilla JavaScript, HTML, and CSS. This project interacts with a live financial API to fetch market data for the top 250 cryptocurrencies, dynamically updating the DOM to mirror the mechanics of a modern Single Page Application (SPA).

## 🚀 Technical Features

*   **High-Volume Data Rendering:** Efficiently fetches and renders real-time data for the top 250 cryptocurrencies, housed within a custom-styled, full-width scrollable viewport for maximum screen real estate.
*   **Data Visualization:** Integrates **Chart.js** to render responsive, interactive line graphs displaying 7-day historical price trends inside a custom modal.
*   **Persistent State Management:** Utilizes the Web Storage API (`localStorage`) to allow users to save and track specific coins, ensuring custom portfolio data survives page refreshes and closed sessions.
*   **Live API Integration:** Fetches real-time cryptocurrency data (prices, 24h market changes, historical charts) using the asynchronous `fetch` API via the CoinGecko V3 endpoints.
*   **Dynamic DOM Manipulation:** Features a "Portfolio View" toggle that instantly cross-references live API data with local memory to filter the UI in real-time, completely bypassing traditional page reloads.
*   **Real-Time Search Engine:** Includes a custom search filter that parses the local data array as the user types, instantly redrawing the UI state to match the query.
*   **Responsive UI/UX:** Built with a flexible CSS layout utilizing viewport heights (`vh`) and percentages to ensure the dashboard dynamically stretches and adapts to various screen sizes.

## 🛠️ Tech Stack

*   **Structure:** HTML5 (Semantic elements, data attributes)
*   **Styling:** CSS3 (Flexbox layout, responsive sizing, custom scrollbars, state-based hover transitions)
*   **Logic:** Vanilla JavaScript / ES6+ (Asynchronous fetching, array methods, DOM event delegation)
*   **Libraries:** Chart.js (via CDN)
*   **API:** CoinGecko API v3

## ⚙️ How to Run Locally

1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/Srushti2510/live-crypto-dashboard.git](https://github.com/Srushti2510/live-crypto-dashboard.git)