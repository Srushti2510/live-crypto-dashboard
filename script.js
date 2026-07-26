const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false';

const getCryptoData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
};

getCryptoData();