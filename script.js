// =========================================
// 1. WELCOME / LOGIN LOGIC
// =========================================
const savedUserName = localStorage.getItem('cryptoUserName');
const welcomeModal = document.getElementById('welcome-modal');
const userNameDisplay = document.getElementById('sidebar-user-name');
const userGreetingContainer = document.getElementById('user-greeting-container');

if (!savedUserName) {
    welcomeModal.style.display = 'flex';
} else {
    userNameDisplay.innerText = savedUserName;
    userGreetingContainer.style.display = 'block';
}

document.getElementById('save-name-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('user-name-input').value.trim();
    if (nameInput !== "") {
        localStorage.setItem('cryptoUserName', nameInput);
        userNameDisplay.innerText = nameInput;
        userGreetingContainer.style.display = 'block';
        welcomeModal.style.display = 'none'; 
    }
});

// =========================================
// 2. GLOBAL VARIABLES
// =========================================
let allCoins = []; 
let favorites = JSON.parse(localStorage.getItem('cryptoFavorites')) || [];
let showingPortfolio = false; 
let myChart = null; 

let currentCurrency = 'usd'; 
const currencySymbols = { usd: '$', eur: '€', inr: '₹' };
let currentSort = 'market_cap'; 

// =========================================
// 3. THEME MANAGEMENT
// =========================================
const savedTheme = localStorage.getItem('cryptoTheme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

const updateThemeButtonText = (theme) => {
    const btn = document.getElementById('theme-toggle');
    if (theme === 'light') {
        btn.innerText = '☾ Dark Mode';
    } else {
        btn.innerText = '☀ Light Mode';
    }
};
updateThemeButtonText(savedTheme);

// =========================================
// 4. API FETCH & RENDER LOGIC
// =========================================
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
            symbol: coin.symbol, 
            image: coin.image,   
            price: coin.current_price,
            change: coin.price_change_percentage_24h
        };
    });
    
    document.getElementById('skeleton-container').style.display = 'none';
    document.getElementById('crypto-container').style.display = 'flex'; 
    
    updateUI(); 
    populateCalculatorDropdown(); 
};

const renderCoins = (coinsArray) => {
    const container = document.getElementById('crypto-container');
    container.innerHTML = ''; 
    
    if (coinsArray.length === 0) {
        container.innerHTML = '<div style="width: 100%; text-align: center; color: var(--text-muted);">No coins found!</div>';
        return;
    }
    
    const symbol = currencySymbols[currentCurrency];
    
    coinsArray.forEach((coin, index) => {
        let colorClass = coin.change > 0 ? 'green-text' : 'red-text';
        let changeSymbol = coin.change > 0 ? '+' : '';
        
        let savedData = favorites.find(fav => fav.name === coin.name);
        let isSaved = !!savedData; 
        
        let buttonText = isSaved ? '✓ Tracked' : '+ Track';
        let buttonClass = isSaved ? 'track-btn saved' : 'track-btn';
        
        let portfolioHTML = '';
        if (showingPortfolio && isSaved) {
            let totalValue = (savedData.amount * coin.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            portfolioHTML = `
                <div class="portfolio-box">
                    <small style="color: var(--text-muted);">Holdings: ${savedData.amount} ${coin.symbol.toUpperCase()}</small><br>
                    <strong style="color: var(--accent-color);">Value: ${symbol}${totalValue}</strong>
                </div>
            `;
        }
        
        let delay = index * 0.03; 
        if (delay > 1.5) delay = 1.5; 

        container.innerHTML += `
            <div class="coin-card" style="animation-delay: ${delay}s">
                <div class="coin-header">
                    <img src="${coin.image}" alt="${coin.name} logo" class="coin-logo">
                    <div class="coin-titles">
                        <strong>${coin.name}</strong>
                        <span class="coin-symbol">${coin.symbol}</span>
                    </div>
                </div>

                <div class="price-row">
                    <span class="price-large">${symbol}${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</span>
                    <span class="${colorClass}">${changeSymbol}${coin.change.toFixed(2)}%</span>
                </div>
                
                ${portfolioHTML}
                
                <div class="card-actions">
                    <button class="${buttonClass}" onclick="toggleFavorite('${coin.name}')">${buttonText}</button>
                    <button class="track-btn" onclick="openChart('${coin.id}', '${coin.name}')">Chart</button>
                </div>
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
    calculateConversion();
};

// =========================================
// 5. CHART LOGIC
// =========================================
const openChart = async (coinId, coinName) => {
    const modal = document.getElementById('chart-modal');
    modal.style.display = 'flex';
    document.getElementById('modal-coin-name').innerText = `${coinName} History`;

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
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: { x: { display: false }, y: { ticks: { color: '#94a3b8' } } },
            plugins: { legend: { display: false } }
        }
    });
};

// =========================================
// 6. CALCULATOR LOGIC
// =========================================
const populateCalculatorDropdown = () => {
    const select = document.getElementById('calc-coin-select');
    select.innerHTML = '';
    allCoins.forEach(coin => {
        select.innerHTML += `<option value="${coin.price}">${coin.name}</option>`;
    });
    calculateConversion();
};

const calculateConversion = () => {
    const price = parseFloat(document.getElementById('calc-coin-select').value) || 0;
    const amount = parseFloat(document.getElementById('calc-amount').value) || 0;
    const total = price * amount;
    const symbol = currencySymbols[currentCurrency];
    document.getElementById('calc-result').innerText = `${symbol}${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// =========================================
// 7. EVENT LISTENERS & INIT
// =========================================
document.getElementById('close-modal').addEventListener('click', () => { document.getElementById('chart-modal').style.display = 'none'; });
document.getElementById('calc-btn').addEventListener('click', () => { document.getElementById('calc-modal').style.display = 'flex'; calculateConversion(); });
document.getElementById('close-calc-modal').addEventListener('click', () => { document.getElementById('calc-modal').style.display = 'none'; });
document.getElementById('calc-coin-select').addEventListener('change', calculateConversion);
document.getElementById('calc-amount').addEventListener('input', calculateConversion);

document.getElementById('search-bar').addEventListener('input', updateUI);
document.getElementById('portfolio-toggle').addEventListener('click', (event) => {
    showingPortfolio = !showingPortfolio; 
    if (showingPortfolio) {
        event.target.innerText = "Back to Live Market";
        event.target.classList.add('active-mode');
    } else {
        event.target.innerText = "View Portfolio";
        event.target.classList.remove('active-mode');
    }
    updateUI(); 
});

document.getElementById('currency-selector').addEventListener('change', (event) => { currentCurrency = event.target.value; getData(); });
document.getElementById('sort-selector').addEventListener('change', (event) => { currentSort = event.target.value; updateUI(); });

document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cryptoTheme', newTheme);
    updateThemeButtonText(newTheme);
});

getData();
setInterval(getData, 20000); 

// =========================================
// 8. EXPORT TO CSV LOGIC
// =========================================
document.getElementById('export-csv-btn').addEventListener('click', () => {
    if (favorites.length === 0) {
        alert("Your portfolio is empty! Track some coins first.");
        return;
    }

    let csvContent = `Coin Name,Symbol,Holdings,Live Price (${currentCurrency.toUpperCase()}),Total Value (${currentCurrency.toUpperCase()})\n`;

    favorites.forEach(fav => {
        const liveCoin = allCoins.find(c => c.name === fav.name);
        if (liveCoin) {
            const price = liveCoin.price;
            const totalValue = fav.amount * price;
            csvContent += `${liveCoin.name},${liveCoin.symbol.toUpperCase()},${fav.amount},${price},${totalValue}\n`;
        }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "BlockPulse_Portfolio.csv");
    link.style.display = "none";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});