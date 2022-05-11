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
