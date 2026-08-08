let allCoins = []; 
let favorites = JSON.parse(localStorage.getItem('cryptoFavorites')) || [];
let showingPortfolio = false; 
let myChart = null; 

// Fetching Top 250 coins for a data-heavy scrollable dashboard
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false';

const getData = async () => {
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
    
    coinsArray.forEach(coin => {
        let colorClass = coin.change > 0 ? 'green-text' : 'red-text';
        let changeSymbol = coin.change > 0 ? '+' : '';
        
        // Look up the coin in our new object array
        let savedData = favorites.find(fav => fav.name === coin.name);
        let isSaved = !!savedData; // Returns true if savedData exists
        
        let buttonText = isSaved ? '⭐ Tracked' : '☆ Track';
        let buttonClass = isSaved ? 'track-btn saved' : 'track-btn';
        
        // The Math Engine: Calculate Net Worth if in Portfolio Mode
        let portfolioHTML = '';
        if (showingPortfolio && isSaved) {
            let totalValue = (savedData.amount * coin.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            portfolioHTML = `
                <div style="margin: 15px 0; padding: 10px; background-color: #1a1a1a; border: 1px dashed #f7931a; border-radius: 6px;">
                    <small style="color: #aaa;">Holdings: ${savedData.amount}</small><br>
                    <strong style="color: #f7931a; font-size: 1.1em;">Value: $${totalValue}</strong>
                </div>
            `;
        }
        
        // Changed outer <p> to <div class="coin-card"> to fix HTML parsing bug
        container.innerHTML += `
            <div class="coin-card">
                <strong style="font-size: 1.1em;">${coin.name}</strong><br>
                $${coin.price.toLocaleString()} <br>
                <span class="${colorClass}">${changeSymbol}${coin.change.toFixed(2)}%</span>
                ${portfolioHTML}
                <br>
                <button class="${buttonClass}" onclick="toggleFavorite('${coin.name}')">${buttonText}</button>
                <button class="track-btn" style="margin-left: 5px; border-color: #888; color: #aaa;" onclick="openChart('${coin.id}', '${coin.name}')">📈 Chart</button>
            </div>
        `;
    });
};

const toggleFavorite = (coinName) => {
    // Check if the coin is already in our new object array
    const existingCoinIndex = favorites.findIndex(fav => fav.name === coinName);

    if (existingCoinIndex !== -1) {
        // If it's already saved, remove it (Untrack)
        favorites.splice(existingCoinIndex, 1);
    } else {
        // If it's not saved, ask the user how much they own
        let amount = prompt(`How much ${coinName} do you currently own?`, "0");
        
        // Cancel if they hit escape or close the prompt
        if (amount === null || amount.trim() === "") return;
        
        amount = parseFloat(amount);
        
        // Validate that they typed a real number
        if (isNaN(amount) || amount < 0) {
            alert("Please enter a valid number.");
            return;
        }
        
        // Save both the name AND the amount
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
    
    // Renders all matched items into the scrollable container at once
    renderCoins(displayCoins);
};

// Chart logic
const openChart = async (coinId, coinName) => {
    const modal = document.getElementById('chart-modal');
    modal.style.display = 'flex';
    document.getElementById('modal-coin-name').innerText = `${coinName} (7-Day History)`;

    const historyUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`;
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
                label: 'Price (USD)',
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

getData();
setInterval(getData, 20000);