# Live Crypto Dashboard

A dynamic, real-time cryptocurrency tracking dashboard built entirely with Vanilla JavaScript, HTML, and CSS. This project interacts with a live financial API to fetch market data and seamlessly updates the DOM without requiring page reloads, mirroring the mechanics of a Single Page Application (SPA).

## 🚀 Features

*   **Live API Integration:** Fetches real-time cryptocurrency data (prices, 24h market changes, etc.) using the CoinGecko API.
*   **Data Visualization:** Integrates **Chart.js** to render responsive, interactive line graphs displaying 7-day historical price trends inside a custom modal.
*   **Persistent State Management:** Utilizes browser `localStorage` to allow users to save and track specific coins, ensuring custom portfolio data survives page refreshes and closed sessions.
*   **Dynamic DOM Manipulation:** Features a "Portfolio View" toggle that instantly cross-references live API data with local memory to filter the UI in real-time, completely bypassing traditional page reloads.
*   **Optimized UI/UX:** Implements CSS-animated **Skeleton Loaders** to prevent Cumulative Layout Shift (CLS) and improve perceived performance during network requests.
*   **Real-Time Search & Filtering:** Includes a custom search engine that filters the local data array as the user types, instantly redrawing the UI.
*   **Asynchronous JavaScript:** Utilizes modern `async/await` and `fetch` logic for smooth network requests.
*   **Auto-Refreshing Engine:** Implements `setInterval` to silently poll the API and update market prices behind the scenes.
*   **Responsive Dark Mode UI:** Built with CSS Flexbox to ensure a clean, responsive layout that automatically wraps cards on smaller screens.

## 🛠️ Technologies Used

*   **HTML5:** Semantic structure and data attributes.
*   **CSS3:** Flexbox layout, state-based hover transitions, CSS keyframe animations, and custom dark mode aesthetics.
*   **JavaScript (ES6+):** Array methods (`map`, `filter`, `forEach`), DOM manipulation, Event Listeners, Asynchronous fetching, and the Web Storage API.
*   **Libraries:** Chart.js (via CDN).

## ⚙️ How to Run Locally

1. Clone this repository to your local machine.
2. Open the project folder in VS Code.
3. Launch the `index.html` file using the **Live Server** extension to view the dashboard in your browser.

---
*Built to master core web fundamentals, state management, UI/UX optimization, and API integration before transitioning into modern JavaScript frameworks.*