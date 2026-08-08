# 📈 Live Crypto Dashboard

A high-performance, real-time cryptocurrency tracking dashboard built entirely with Vanilla JavaScript, HTML, and CSS. This project interacts with a live financial API to fetch market data for the top 250 cryptocurrencies, dynamically updating the DOM to mirror the mechanics of a modern Single Page Application (SPA).

## 🚀 Technical Features

*   **High-Volume Data Rendering:** Efficiently fetches and renders real-time data for the top 250 cryptocurrencies, housed within a custom-styled, full-width scrollable viewport for maximum screen real estate.
*   **Automated Portfolio Engine:** Features a custom mathematical engine that calculates real-time net worth by cross-referencing user-inputted holdings with live market prices.
*   **Global Currency Selection:** Dynamically manipulates API endpoint parameters to fetch and display financial data in USD ($), EUR (€), or INR (₹) based on user selection.
*   **Persistent State Management:** Utilizes the Web Storage API (`localStorage`) to allow users to save and track specific coins and quantities, ensuring custom portfolio data survives page refreshes and closed sessions.
*   **Data Visualization:** Integrates **Chart.js** to render responsive, interactive line graphs displaying 7-day historical price trends inside a custom modal.
*   **Dynamic DOM Manipulation:** Features a "Portfolio View" toggle that instantly filters the UI in real-time, completely bypassing traditional page reloads.
*   **Real-Time Search Engine:** Includes a custom search filter that parses the local data array as the user types, instantly redrawing the UI state to match the query.

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