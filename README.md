# 📈 Live Crypto Dashboard

A dynamic, real-time cryptocurrency tracking dashboard built entirely with Vanilla JavaScript, HTML and CSS. This project interacts with a live financial API to fetch market data and seamlessly updates the DOM without requiring page reloads, mirroring the mechanics of a modern Single Page Application (SPA).

## 🚀 Technical Features

*   **Client-Side Pagination:** Fetches the top 100 cryptocurrencies and uses advanced array slicing to handle local pagination, ensuring peak browser performance by only rendering 10 DOM elements at a time.
*   **Data Visualization:** Integrates **Chart.js** to render responsive, interactive line graphs displaying 7-day historical price trends inside a custom modal.
*   **Persistent State Management:** Utilizes browser `localStorage` to allow users to save and track specific coins, ensuring custom portfolio data survives page refreshes and closed sessions.
*   **Live API Integration:** Fetches real-time cryptocurrency data (prices, 24h market changes, historical charts) using the asynchronous `fetch` API via CoinGecko.
*   **Dynamic DOM Manipulation:** Features a "Portfolio View" toggle that instantly cross-references live API data with local memory to filter the UI in real-time, completely bypassing traditional page reloads.
*   **Optimized UI/UX:** Implements CSS-animated **Skeleton Loaders** to prevent Cumulative Layout Shift (CLS) and improve perceived performance during network requests.
*   **Real-Time Search Engine:** Includes a custom search filter that parses the local data array as the user types, instantly redrawing the UI state.

## 🛠️ Tech Stack

*   **Structure:** HTML5 (Semantic elements, data attributes)
*   **Styling:** CSS3 (Flexbox layout, custom variables, state-based hover transitions, keyframe animations)
*   **Logic:** Vanilla JavaScript / ES6+ (Asynchronous fetching, array methods, DOM event delegation, Web Storage API)
*   **Libraries:** Chart.js (via CDN)
*   **API:** CoinGecko API v3

## ⚙️ How to Run Locally

1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/Srushti2510/live-crypto-dashboard.git](https://github.com/Srushti2510/live-crypto-dashboard.git)