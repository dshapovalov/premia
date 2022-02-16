import axios from 'axios';

const query = `{
  pair(id:"0xceff51756c56ceffca006cd410b03ffc46dd3a58") {
    name,
    dayData(orderBy: date, orderDirection:desc) {
      volumeUSD,
      date
    },
    token0 {
      liquidity,
      dayData(orderBy: date, orderDirection:desc) {
        liquidityUSD,
        priceUSD
      }
    },
    token1 {
      liquidity,
      dayData(orderBy: date, orderDirection:desc) {
        liquidityUSD,
        priceUSD
      }
    }
    token0Price,
    token1Price
  }
}`;

export async function getPairData() {
  try {
    return await axios.post(`https://api.thegraph.com/subgraphs/name/sushiswap/exchange`, {
      query,
    });
  } catch (error) {
    throw new Error(error);
  }
}

const api = { getPairData };

export default api;
