# Live Crypto Dashboard

A dynamic, real-time cryptocurrency tracking dashboard built entirely with Vanilla JavaScript, HTML, and CSS. This project interacts with a live financial API to fetch market data and seamlessly updates the DOM without requiring page reloads.

## 🚀 Features

*   **Live API Integration:** Fetches real-time cryptocurrency data (prices, 24h market changes, etc.) using the CoinGecko API.
*   **Asynchronous JavaScript:** Utilizes modern `async/await` and `fetch` logic for smooth network requests.
*   **Auto-Refreshing Engine:** Implements `setInterval` to silently poll the API and update market prices every 10 seconds behind the scenes.
*   **Dynamic Search & Filtering:** Features a custom search engine that filters the local data array in real-time based on user input, instantly redrawing the UI.
*   **Conditional UI Styling:** Uses JavaScript ternary operators to dynamically inject CSS classes (green for positive growth, red for market dips).
*   **Responsive Dark Mode UI:** Built with CSS Flexbox to ensure a clean, responsive layout that automatically wraps cards on smaller screens.

## 🛠️ Technologies Used

*   **HTML5:** Semantic structure and input handling.
*   **CSS3:** Flexbox layout, hover transitions, and custom dark mode aesthetics.
*   **JavaScript (ES6+):** Array methods (`map`, `filter`, `forEach`), DOM manipulation, Event Listeners, and Asynchronous fetching.

## ⚙️ How to Run Locally

1. Clone this repository to your local machine.
2. Open the project folder in VS Code.
3. Launch the `index.html` file using the **Live Server** extension to view the dashboard in your browser.

---
*Built to master core web fundamentals, state management, and API integration before transitioning into modern JavaScript frameworks.*