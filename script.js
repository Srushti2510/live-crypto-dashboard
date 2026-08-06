let allCoins = []; 
let favorites = JSON.parse(localStorage.getItem('cryptoFavorites')) || [];
let showingPortfolio = false; 
let myChart = null; // NEW: A variable to track and reset our chart

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    
    allCoins = data.map(coin => {
        return {
            id: coin.id, // NEW: We need the coin's specific ID to fetch its history
            name: coin.name,
            price: coin.current_price,
            change: coin.price_change_percentage_24h
        };
    });
    
    document.getElementById('skeleton-container').style.display = 'none';
    document.getElementById('crypto-container').style.display = 'flex'; 
    
    updateUI(); 
};

const renderCoins = (coinsArray) => {
    const container = document.getElementById('crypto-container');
    container.innerHTML = ''; 
    
    if (coinsArray.length === 0) {
        container.innerHTML = '<p style="width: 100%; border: none; box-shadow: none;">No coins found!</p>';
        return;
    }
    
    coinsArray.forEach(coin => {
        let colorClass = coin.change > 0 ? 'green-text' : 'red-text';
        let changeSymbol = coin.change > 0 ? '+' : '';
        let isSaved = favorites.includes(coin.name);
        
        let buttonText = isSaved ? '⭐ Tracked' : '☆ Track';
        let buttonClass = isSaved ? 'track-btn saved' : 'track-btn';
        
        container.innerHTML += `
            <p>
                <strong>${coin.name}</strong>: $${coin.price} <br>
                <span class="${colorClass}">${changeSymbol}${coin.change.toFixed(2)}%</span>
                <br>
                <button class="${buttonClass}" onclick="toggleFavorite('${coin.name}')">${buttonText}</button>
                <!-- NEW: The Chart Button -->
                <button class="track-btn" style="margin-left: 5px; border-color: #888; color: #aaa;" onclick="openChart('${coin.id}', '${coin.name}')">📈 Chart</button>
            </p>
        `;
    });
};

const toggleFavorite = (coinName) => {
    if (favorites.includes(coinName)) {
        favorites = favorites.filter(name => name !== coinName);
    } else {
        favorites.push(coinName);
    }
    localStorage.setItem('cryptoFavorites', JSON.stringify(favorites));
    updateUI(); 
};

const updateUI = () => {
    const typedWord = document.getElementById('search-bar').value.toLowerCase();
    
    let displayCoins = allCoins.filter(coin => 
        coin.name.toLowerCase().includes(typedWord)
    );
    
    if (showingPortfolio) {
        displayCoins = displayCoins.filter(coin => favorites.includes(coin.name));
    }
    
    renderCoins(displayCoins);
};

// NEW: The Master Chart Function
const openChart = async (coinId, coinName) => {
    // 1. Show the modal overlay
    const modal = document.getElementById('chart-modal');
    modal.style.display = 'flex';
    document.getElementById('modal-coin-name').innerText = `${coinName} (7-Day History)`;

    // 2. Fetch the 7-day historical data for this specific coin
    const historyUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`;
    const response = await fetch(historyUrl);
    const data = await response.json();
    
    // 3. Extract just the prices and timestamps for the graph
    const prices = data.prices.map(price => price[1]);
    const labels = data.prices.map(price => {
        const date = new Date(price[0]);
        return `${date.getMonth()+1}/${date.getDate()}`; // Format as Month/Day
    });

    // 4. Draw the graph using Chart.js
    const ctx = document.getElementById('coin-chart').getContext('2d');
    
    // If a chart already exists from clicking a previous coin, destroy it first so they don't overlap
    if (myChart) {
        myChart.destroy(); 
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price (USD)',
                data: prices,
                borderColor: '#f7931a', // Theme color
                backgroundColor: 'rgba(247, 147, 26, 0.2)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0 // Hide dots for a sleek minimalist look
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { display: false }, // Hide cluttered bottom labels
                y: { ticks: { color: '#aaa' } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
};

// NEW: Close the Modal when the 'X' is clicked
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('chart-modal').style.display = 'none';
});

// Listeners
document.getElementById('search-bar').addEventListener('input', updateUI);

document.getElementById('portfolio-toggle').addEventListener('click', (event) => {
    showingPortfolio = !showingPortfolio; 
    
    if (showingPortfolio) {
        event.target.innerText = "Back to Live Market";
        event.target.classList.add('active-mode');
    } else {
        event.target.innerText = "View My Portfolio";
        event.target.classList.remove('active-mode');
    }
    
    updateUI(); 
});

// Start the engine
getData();
setInterval(getData, 20000); // Slowed down refresh to 20 seconds to prevent API limits while rendering graphs