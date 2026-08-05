let allCoins = []; 
let favorites = JSON.parse(localStorage.getItem('cryptoFavorites')) || [];
let showingPortfolio = false; // New state to track which view we are in

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    
    allCoins = data.map(coin => {
        return {
            name: coin.name,
            price: coin.current_price,
            change: coin.price_change_percentage_24h
        };
    });
    
    // NEW LOGIC: Hide the skeletons and show the real data container
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
    updateUI(); // Redraw immediately
};

// MASTER UI UPDATER: Handles both searching and portfolio filtering
const updateUI = () => {
    const typedWord = document.getElementById('search-bar').value.toLowerCase();
    
    // 1. Filter by search word
    let displayCoins = allCoins.filter(coin => 
        coin.name.toLowerCase().includes(typedWord)
    );
    
    // 2. Filter by portfolio mode (if active)
    if (showingPortfolio) {
        displayCoins = displayCoins.filter(coin => favorites.includes(coin.name));
    }
    
    renderCoins(displayCoins);
};

// Search Listener
document.getElementById('search-bar').addEventListener('input', updateUI);

// Portfolio Toggle Listener
document.getElementById('portfolio-toggle').addEventListener('click', (event) => {
    showingPortfolio = !showingPortfolio; // Flip the state
    
    // Update button visuals
    if (showingPortfolio) {
        event.target.innerText = "Back to Live Market";
        event.target.classList.add('active-mode');
    } else {
        event.target.innerText = "View My Portfolio";
        event.target.classList.remove('active-mode');
    }
    
    updateUI(); // Redraw the UI
});

// Start the engine
getData();
setInterval(getData, 10000);