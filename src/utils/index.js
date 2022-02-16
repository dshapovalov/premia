import { useCallback } from 'react';
import { DATA_PERIODS } from 'mainConstants';

const priceString = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

const priceStringWBTC = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 4,
});

export const priceStringUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function toDecimals(priceString, priceString2) {
  return parseFloat((parseFloat(priceString || 0) + parseFloat(priceString2 || 0)).toFixed(2));
}

export function prepareExchangeData(original) {
  const { pair } = original.data;

  const data = pair.dayData.map(({ date: unixDate, volumeUSD }, i) => {
    const date = new Date(unixDate * 1000);
    const dayData0 = pair.token0.dayData[i];
    const dayData1 = pair.token1.dayData[i];

    return {
      pairLiquidityUSD: toDecimals(dayData0.liquidityUSD, dayData1.liquidityUSD),
      pairVolumeUSD: toDecimals(volumeUSD),
      date,
      dateFormatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  return {
    data: data.reverse(),
    WBTCPrice: priceStringWBTC.format(pair.token0Price),
    WBTCPriceUSD: priceStringUSD.format(pair.token0.dayData[0].priceUSD),
    WETHPrice: priceString.format(pair.token1Price),
    WETHPriceUSD: priceStringUSD.format(pair.token1.dayData[0].priceUSD),
    WBTCLiquidity: priceString.format(pair.token0.liquidity),
    WETHLiquidity: priceString.format(pair.token1.liquidity),
  };
}

export function getFormattedDate(date, period) {
  let format = period === DATA_PERIODS[0] ? { weekday: 'short' } : { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', format);
}

export function getFilteredData(data, period) {
  const { date } = data[data.length - 1];
  let rootDate = new Date(date.getTime());
  switch (period) {
    case DATA_PERIODS[0]:
      rootDate.setDate(rootDate.getDate() - 6);
      break;
    case DATA_PERIODS[1]:
      rootDate.setDate(rootDate.getDate() - 30);
      break;
    default:
      rootDate = null;
      break;
  }
  return rootDate ? data.filter((item) => item.date >= rootDate) : data;
}

export const nil = () => null;

export function useHoverCallback(onHover, key) {
  return useCallback(
    ({ activePayload }) => {
      if (activePayload) {
        const { payload } = activePayload[0];
        onHover(priceStringUSD.format(payload[key]), payload.dateFormatted);
      }
    },
    [onHover, key]
  );
}
