import axios from 'axios';
import { sushiMainnetExchangePlaygroundResponse } from './serviceMock';

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

export async function getPairDataKeyNeeded() {
  try {
    return await axios.post(`https://api.thegraph.com/subgraphs/name/sushiswap/exchange`, {
      query,
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPairData() {
  return sushiMainnetExchangePlaygroundResponse;
}

const api = { getPairData, getPairDataKeyNeeded };

export default api;
