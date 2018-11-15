import { AsyncStorage } from 'react-native';
import { observable, action, computed, set } from 'mobx';
import Model from './model';
import wallet from 'src/utils/wallet';
import log from 'src/utils/log';
import config from 'src/config';

export default class Wallet extends Model {
  @observable address = '';
  @observable hasWif = false;
  @observable hasMnemonic = false;
  @observable balanceSat = '0';
  @observable stakingSat = '0';
  @observable matureSat = '0';
  @observable totalReceivedSat = '0';
  @observable totalSentSat = '0';
  @observable ranking = 0;
  @observable blocksStaked = 0;
  @observable totalTxCount = 0;
  @observable qrc20List = [];
  @observable balanceHistory = [];
  @observable balanceHistoryCount = 0;
  @observable balanceHistoryPage = 0;
  @observable txMap = new Map();
  pageSize = 20;

  apiHost = config.api.host;

  @action
  setAddress = async (address) => {
    this.address = address;
    try {
      await AsyncStorage.setItem('address', address);
      return true;
    } catch (error) {
      log.fatal('async storage set address error', {
        address,
        error,
      });
      return false;
    }
  };

  @action
  getAddress = async () => {
    try {
      const address = await AsyncStorage.getItem('address');
      this.address = address;
      return address;
    } catch (error) {
      log.fatal('async storage get address error', {
        error,
      });
      return this.address;
    }
  };

  @action
  delAddress = async () => {
    try {
      await AsyncStorage.clear();
      this.address = '';
      this.hasWif = false;
      this.hasMnemonic = false;
      this.balanceSat = '0';
      this.stakingSat = '0';
      this.matureSat = '0';
      this.totalReceivedSat = '0';
      this.totalSentSat = '0';
      this.ranking = 0;
      this.blocksStaked = 0;
      this.totalTxCount = 0;
      this.qrc20List = [];
      this.balanceHistory = [];
      this.balanceHistoryCount = 0;
      this.balanceHistoryPage = 0;
      return true;
    } catch (error) {
      log.warning('async storage remove address error', {
        error,
      });
      return false;
    }
  };

  @action
  fetchWalletInfo = async (address) => {
    address = address ? address : this.address;
    try {
      const res = await this.get(`${this.apiHost}/address/${address}`);
      if (res) {
        set(this, {
          balanceSat: res.balance,
          stakingSat: res.staking,
          matureSat: res.mature,
          totalReceivedSat: res.totalReceived,
          totalSentSat: res.totalSent,
          ranking: res.ranking,
          blocksStaked: res.blocksStaked,
          totalTxCount: res.totalCount,
          qrc20List: res.qrc20TokenBalances ? res.qrc20TokenBalances : [],
        });
      }
    } catch (error) {
      log.warningWithToast('common.network.address.failed', 'Fetch Address Failed', error);
    }
  };

  @computed
  get balance() {
    return wallet.changeUnitFromSatTo1(this.balanceSat);
  }

  @computed
  get mature() {
    return wallet.changeUnitFromSatTo1(this.matureSat);
  }

  @computed
  get staking() {
    return wallet.changeUnitFromSatTo1(this.stakingSat);
  }

  @action
  fetchHistory = async (address) => {
    address = address ? address : this.address;
    try {
      const res = await this.get(`${this.apiHost}/address/${address}/balance-history`, {
        page: this.balanceHistoryPage,
        pageSize: this.pageSize,
      });
      if (res) {
        const appendList = [];
        const idMap = {};
        res.transactions.forEach((item) => {
          appendList.push({
            key: item.id,
            id: item.id,
            height: item.blockHeight,
            timestamp: item.timestamp,
            amountSat: item.amount,
            balanceSat: item.balance,
            amount: wallet.changeUnitFromSatTo1(item.amount),
            balance: wallet.changeUnitFromSatTo1(item.balance),
            tx: null,
            type: null,
          });
          idMap[item.id] = true;
        });
        await this.fetchTxs(Object.keys(idMap));
        appendList.forEach((item, index) => {
          item.tx = this.txMap.get(item.id);
          item.type = wallet.calTxType(item.tx, address);
          appendList[index] = item;
        });
        set(this, {
          balanceHistory: this.balanceHistory.concat(appendList),
          balanceHistoryCount: res.count,
          balanceHistoryPage: this.balanceHistoryPage + 1,
        });
      }
    } catch (error) {
      log.warningWithToast('common.network.address.failed', 'Fetch Balance History Failed', error);
    }
  };

  @action
  fetchTxs = async (txIdList = []) => {
    if (!txIdList.length) {
      return null;
    }
    try {
      const res = await this.get(`${this.apiHost}/txs/${txIdList.join(',')}`);
      if (res) {
        const txMap = this.txMap;
        res.forEach(item => {
          txMap.set(item.id, item);
        });
        this.txMap = txMap;
      }
    } catch (error) {
      log.warningWithToast('common.network.tx.notFound', 'Fetch Tx Failed', error);
    }
  };
}