let allCoins = []; // We save the live data here so the search bar can read it instantly

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

// 1. The Data Engine: Only responsible for fetching from the internet
const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    
    // Save the cleaned data to our global array
    allCoins = data.map(coin => {
        return {
            name: coin.name,
            price: coin.current_price,
            change: coin.price_change_percentage_24h
        };
    });
    
    renderCoins(allCoins); // Pass the full array to the visual engine
};

// 2. The Visual Engine: Only responsible for drawing cards on the screen
const renderCoins = (coinsArray) => {
    const container = document.getElementById('crypto-container');
    container.innerHTML = ''; // Clear the board
    
    coinsArray.forEach(coin => {
        let colorClass = coin.change > 0 ? 'green-text' : 'red-text';
        let changeSymbol = coin.change > 0 ? '+' : '';
        
        container.innerHTML += `
            <p>
                <strong>${coin.name}</strong>: $${coin.price} <br>
                <span class="${colorClass}">${changeSymbol}${coin.change.toFixed(2)}%</span>
            </p>
        `;
    });
};

// 3. The Search Listener: Fires every time you type a letter
document.getElementById('search-bar').addEventListener('input', (event) => {
    const typedWord = event.target.value.toLowerCase();
    
    // Filter the global array to only include coins that match what you typed
    const filteredCoins = allCoins.filter(coin => 
        coin.name.toLowerCase().includes(typedWord)
    );
    
    renderCoins(filteredCoins); // Redraw the screen with the filtered list
});

// Start the engine
getData();
setInterval(getData, 10000); // Keep the data fresh every 10 seconds