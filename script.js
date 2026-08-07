let allCoins = []; 
let favorites = JSON.parse(localStorage.getItem('cryptoFavorites')) || [];
let showingPortfolio = false; 
let myChart = null; 

// NEW: Pagination State
let currentPage = 1;
const coinsPerPage = 10;

// CHANGED: URL now fetches top 100 coins instead of 10
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

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
    document.getElementById('pagination-controls').style.display = 'flex'; // Show pagination
    
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
    
    // NEW: Pagination Logic
    const totalPages = Math.ceil(displayCoins.length / coinsPerPage);
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages; 
    
    const startIndex = (currentPage - 1) * coinsPerPage;
    const endIndex = startIndex + coinsPerPage;
    const paginatedCoins = displayCoins.slice(startIndex, endIndex);
    
    renderCoins(paginatedCoins);

    // Update Pagination UI
    document.getElementById('page-indicator').innerText = `Page ${currentPage} of ${totalPages || 1}`;
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages || totalPages === 0;
};

// Chart logic remains unchanged
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
document.getElementById('search-bar').addEventListener('input', () => {
    currentPage = 1; // Reset to page 1 on search
    updateUI();
});

document.getElementById('portfolio-toggle').addEventListener('click', (event) => {
    showingPortfolio = !showingPortfolio; 
    currentPage = 1; // Reset to page 1 on toggle
    
    if (showingPortfolio) {
        event.target.innerText = "Back to Live Market";
        event.target.classList.add('active-mode');
    } else {
        event.target.innerText = "View My Portfolio";
        event.target.classList.remove('active-mode');
    }
    updateUI(); 
});

// NEW: Pagination Listeners
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateUI();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentPage++;
    updateUI();
});

getData();
setInterval(getData, 20000);