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

const API_KEY = null;

export async function getPairDataKeyNeeded() {
  try {
    return await axios.post(`https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`, {
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
