

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getTopCoins = async () => {
  const res = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`);
  return res.json();
};

export const getCoinDetail = async (id:string) => {
  const res = await fetch(`${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`);
  return res.json();
};