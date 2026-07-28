const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false';

const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    
    const cleanData = data.map(coin => {
        return {
            name: coin.name,
            price: coin.current_price
        };
    });
    
    // 1. Point JavaScript to the empty box in your HTML
    const container = document.getElementById('crypto-container');
    
    // 2. Erase the "Loading live data..." text
    container.innerHTML = '';
    
    // 3. Loop through our 3 coins and print them directly onto the webpage
    cleanData.forEach(coin => {
        container.innerHTML += `<p><strong>${coin.name}</strong>: $${coin.price}</p>`;
    });
};

getData();