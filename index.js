const API = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Cdogecoin%2Ctron&vs_currencies=usd&include_24hr_change=true';
const container = document.querySelector(".container");

const logoPicker = (coinName) => {
    switch (coinName) {
        case "bitcoin":
            return './Images/BTC.png'
            break;
        case "dogecoin":
            return './Images/Doge.png'
            break;
        case "ethereum":
            return './Images/ETH.png'
            break;
        case "tether":
            return './Images/TET.png'
            break;
        case 'tron':
            return './Images/TRON.png'
        default:
            return "";
    }
}
const symbol = (coinName) => {
    switch (coinName) {
        case "bitcoin":
            return 'BTC'
            break;
        case "dogecoin":
            return 'DOGE'
            break;
        case "ethereum":
            return 'ETH'
            break;
        case "tether":
            return 'USDT'
            break;
        case 'tron':
            return 'TRX'
        default:
            return "";
    }
}

container.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
axios.get(API).then(res => {
    const result = res.data;
    const coinNames = Object.keys(result);
    const coinInformations = Object.values(result);
    container.innerHTML = '';
    coinNames.forEach((coinName, i) => {
        const priceColor = () => {
            if (coinInformations[i].usd_24h_change > 0) {
                return "green";
            }
            if (coinInformations[i].usd_24h_change < 0) {
                return "red";
            }
        }
        container.innerHTML += `
        <div class="coin-result">
        <img src="${logoPicker(coinName)}" alt="coin pic" />
        <div class="name-container">
          <p class="name">${coinName}</p>
          <p class="symbol">${symbol(coinName)}</p>
        </div>
        <div class="price-container">
          <p class="price">$${coinInformations[i].usd}</p>
          <p class="price-change ${priceColor()}">${coinInformations[i].usd_24h_change.toFixed(2)}%</p>
        </div>
      </div>
        `
    })
})
