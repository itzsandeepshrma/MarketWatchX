const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,litecoin,cardano,monero&order=market_cap_desc&sparkline=false';

async function fetchCrypto() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    const container = document.getElementById('crypto-cards');
    container.innerHTML = '';

    data.forEach(coin => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
        <div class="price">$${coin.current_price.toLocaleString()}</div>
        <div class="details">
          <p>24h Change: <strong style="color:${coin.price_change_percentage_24h >= 0 ? '#0f0' : '#f55'};">
            ${coin.price_change_percentage_24h.toFixed(2)}%
          </strong></p>
          <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
          <p>Last Updated: ${new Date(coin.last_updated).toLocaleTimeString()}</p>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("API Error:", err);
  }
}

fetchCrypto();
setInterval(fetchCrypto, 60000);
