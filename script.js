let allCoins = []; 
let favorites = JSON.parse(localStorage.getItem('cryptoFavorites')) || [];
let showingPortfolio = false; 
let myChart = null; 

let currentCurrency = 'usd'; 
const currencySymbols = { usd: '$', eur: '€', inr: '₹' };
let currentSort = 'market_cap'; 

// NEW: Theme Persistence Logic
const savedTheme = localStorage.getItem('cryptoTheme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

const updateThemeButtonText = (theme) => {
    const btn = document.getElementById('theme-toggle');
    if (theme === 'light') {
        btn.innerText = '🌙 Dark Mode';
    } else {
        btn.innerText = '☀️ Light Mode';
    }
};
updateThemeButtonText(savedTheme);

const getData = async () => {
    document.getElementById('crypto-container').style.display = 'none';
    document.getElementById('skeleton-container').style.display = 'block';

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    allCoins = data.map(coin => {
        return {
            id: coin.id, 
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
        container.innerHTML = '<div style="width: 100%; border: none; box-shadow: none; background: transparent; text-align: center;">No coins found!</div>';
        return;
    }
    
    const symbol = currencySymbols[currentCurrency];
    
    coinsArray.forEach(coin => {
        let colorClass = coin.change > 0 ? 'green-text' : 'red-text';
        let changeSymbol = coin.change > 0 ? '+' : '';
        
        let savedData = favorites.find(fav => fav.name === coin.name);
        let isSaved = !!savedData; 
        
        let buttonText = isSaved ? '⭐ Tracked' : '☆ Track';
        let buttonClass = isSaved ? 'track-btn saved' : 'track-btn';
        
        let portfolioHTML = '';
        if (showingPortfolio && isSaved) {
            let totalValue = (savedData.amount * coin.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            portfolioHTML = `
                <div class="portfolio-box">
                    <small style="opacity: 0.7;">Holdings: ${savedData.amount}</small><br>
                    <strong style="color: #f7931a; font-size: 1.1em;">Value: ${symbol}${totalValue}</strong>
                </div>
            `;
        }
        
        container.innerHTML += `
            <div class="coin-card">
                <strong style="font-size: 1.1em;">${coin.name}</strong><br>
                ${symbol}${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} <br>
                <span class="${colorClass}">${changeSymbol}${coin.change.toFixed(2)}%</span>
                ${portfolioHTML}
                <br>
                <button class="${buttonClass}" onclick="toggleFavorite('${coin.name}')">${buttonText}</button>
                <button class="track-btn" style="margin-left: 5px; border-color: #888;" onclick="openChart('${coin.id}', '${coin.name}')">📈 Chart</button>
            </div>
        `;
    });
};

const toggleFavorite = (coinName) => {
    const existingCoinIndex = favorites.findIndex(fav => fav.name === coinName);

    if (existingCoinIndex !== -1) {
        favorites.splice(existingCoinIndex, 1);
    } else {
        let amount = prompt(`How much ${coinName} do you currently own?`, "0");
        
        if (amount === null || amount.trim() === "") return;
        
        amount = parseFloat(amount);
        
        if (isNaN(amount) || amount < 0) {
            alert("Please enter a valid number.");
            return;
        }
        
        favorites.push({ name: coinName, amount: amount });
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
        displayCoins = displayCoins.filter(coin => favorites.some(fav => fav.name === coin.name));
    }
    
    if (currentSort === 'gainers') {
        displayCoins.sort((a, b) => b.change - a.change); 
    } else if (currentSort === 'losers') {
        displayCoins.sort((a, b) => a.change - b.change); 
    } else if (currentSort === 'price_high') {
        displayCoins.sort((a, b) => b.price - a.price); 
    } else if (currentSort === 'price_low') {
        displayCoins.sort((a, b) => a.price - b.price); 
    }
    
    renderCoins(displayCoins);
};

const openChart = async (coinId, coinName) => {
    const modal = document.getElementById('chart-modal');
    modal.style.display = 'flex';
    document.getElementById('modal-coin-name').innerText = `${coinName} (7-Day History)`;

    const historyUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currentCurrency}&days=7`;
    const response = await fetch(historyUrl);
    const data = await response.json();
    
    const prices = data.prices.map(price => price[1]);
    const labels = data.prices.map(price => {
        const date = new Date(price[0]);
        return `${date.getMonth()+1}/${date.getDate()}`; 
    });

    const ctx = document.getElementById('coin-chart').getContext('2d');
    
    if (myChart) myChart.destroy(); 

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Price (${currentCurrency.toUpperCase()})`,
                data: prices,
                borderColor: '#f7931a',
                backgroundColor: 'rgba(247, 147, 26, 0.2)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: { x: { display: false }, y: { ticks: { color: '#aaa' } } },
            plugins: { legend: { display: false } }
        }
    });
};

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('chart-modal').style.display = 'none';
});

// Event Listeners
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

document.getElementById('currency-selector').addEventListener('change', (event) => {
    currentCurrency = event.target.value;
    getData(); 
});

document.getElementById('sort-selector').addEventListener('change', (event) => {
    currentSort = event.target.value;
    updateUI();
});

// NEW: Theme Toggle Click Listener
document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cryptoTheme', newTheme);
    updateThemeButtonText(newTheme);
});

getData();
setInterval(getData, 20000);