import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { mainnetExchangeStore as store } from 'stores';
import { BarChart, LineChart, Spinner, Toggle } from 'components';
import { DATA_PERIODS } from 'mainConstants';
import styles from './MainnetExchangePage.module.scss';
import { priceStringUSD } from 'utils';

function MainnetExchangePage() {
  useEffect(() => {
    store.loadWBTCtoWETHPairData();
  }, []);

  const { filteredData, loaded, period, setPeriod, WBTCPrice, WBTCPriceUSD, WETHPrice, WETHPriceUSD, WBTCLiquidity, WETHLiquidity } = store;

  const [liquidity, setLiquidity] = useState('');
  const [liquidityDate, setLiquidityDate] = useState('');
  const [volume, setVolume] = useState('');
  const [volumeDate, setVolumeDate] = useState('');

  const setLiquidityHeader = useCallback(
    (value, date) => {
      if (date !== liquidityDate) {
        setLiquidity(value);
        setLiquidityDate(date);
      }
    },
    [liquidityDate]
  );

  const setVolumeHeader = useCallback(
    (value, date) => {
      if (date !== volumeDate) {
        setVolume(value);
        setVolumeDate(date);
      }
    },
    [volumeDate]
  );

  useEffect(() => {
    if (loaded) {
      const item = filteredData[filteredData.length - 1];
      setLiquidityHeader(priceStringUSD.format(item.pairLiquidityUSD), item.dateFormatted);
      setVolumeHeader(priceStringUSD.format(item.pairVolumeUSD), item.dateFormatted);
    }
  }, [loaded]);

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.headerRow}>
        <h2>FE Test exercise</h2>
        <div className={styles.secondaryText}>Good luck :)</div>
      </div>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.line}>
            <div className={styles.wbtcIcon} />
            <div className={styles.header}>{WBTCLiquidity}</div>
            <div className={styles.secondaryText}>WBTC</div>
          </div>
          <div className={styles.line}>
            <div>1 WBTC = {WETHPrice} WETH</div>
            <div className={styles.secondaryText}>({WBTCPriceUSD})</div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.line}>
            <div className={styles.wethIcon} />
            <div className={styles.header}>{WETHLiquidity}</div>
            <div className={styles.secondaryText}>WETH</div>
          </div>
          <div className={styles.line}>
            <div>1 WETH = {WBTCPrice} WBTC</div>
            <div className={styles.secondaryText}>({WETHPriceUSD})</div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.chartContainer}>
          <div className={styles.chartDescription}>
            <div className={styles.chartLegend}>
              <div className={styles.label}>
                Liquidity
                <div className={styles.date}>{liquidityDate}</div>
              </div>
              <div className={styles.largeText}>{liquidity}</div>
            </div>
            <Toggle options={DATA_PERIODS} value={period} onChange={setPeriod} />
          </div>
          <div className={styles.chartWrapper}>
            <LineChart data={filteredData} dataKey="pairLiquidityUSD" onHover={setLiquidityHeader} period={period} />
          </div>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chartDescription}>
            <div className={styles.chartLegend}>
              <div className={styles.label}>
                Volume
                <div className={styles.date}>{volumeDate}</div>
              </div>
              <div className={styles.largeText}>{volume}</div>
            </div>
            <Toggle options={DATA_PERIODS} value={period} onChange={setPeriod} />
          </div>
          <div className={styles.chartWrapper}>
            <BarChart data={filteredData} dataKey="pairVolumeUSD" onHover={setVolumeHeader} period={period} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(MainnetExchangePage);
