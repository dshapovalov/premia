import { makeObservable, observable, runInAction } from 'mobx';
import { getFilteredData, prepareExchangeData } from 'utils';
import { DATA_PERIODS } from 'mainConstants';
import api from 'services';

class MainnetExchangeStore {
  data = null;
  filteredData = null;
  loaded = false;
  period = null;
  WBTCPrice = null;
  WBTCPriceUSD = null;
  WETHPrice = null;
  WETHPriceUSD = null;
  WBTCLiquidity = null;
  WETHLiquidity = null;

  constructor(service) {
    this.service = service;

    makeObservable(this, { filteredData: observable, period: observable });
  }

  loadWBTCtoWETHPairData = async () => {
    runInAction(() => {
      this.loaded = false;
    });

    const pairData = await this.service.getPairData();

    const { data, WBTCPrice, WBTCPriceUSD, WETHPrice, WETHPriceUSD, WBTCLiquidity, WETHLiquidity } = prepareExchangeData(pairData);

    runInAction(() => {
      this.data = data;
      this.period = DATA_PERIODS[0];
      this.WBTCPrice = WBTCPrice;
      this.WBTCPriceUSD = WBTCPriceUSD;
      this.WETHPrice = WETHPrice;
      this.WETHPriceUSD = WETHPriceUSD;
      this.WBTCLiquidity = WBTCLiquidity;
      this.WETHLiquidity = WETHLiquidity;
      this.loaded = true;
      this.filterData();
    });
  };

  filterData = () => {
    runInAction(() => {
      this.filteredData = getFilteredData(this.data, this.period);
    });
  };

  setPeriod = (period) => {
    runInAction(() => {
      this.period = period;
      this.filterData();
    });
  };
}

export const mainnetExchangeStore = new MainnetExchangeStore(api.mainnetExchange);
