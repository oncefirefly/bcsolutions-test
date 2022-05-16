export const getGraphData = (currency, vsCurrency) =>
  fetch(
    `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=${vsCurrency}&days=14&interval=daily`
  )
    .then((r) => r.json())
    .then((data) => data.prices);

export const getConvertData = (currency, vsCurrency) =>
  fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=${vsCurrency}`
  )
    .then((r) => r.json())
    .then((data) => Object.values(Object.values(data)[0])[0]);

export const getPortfolioData = () =>
  fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd'
  )
    .then((r) => r.json())
    .then((data) => data);
