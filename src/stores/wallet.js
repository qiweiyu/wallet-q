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
  @observable balanceSat = null;
  @observable stakingSat = null;
  @observable matureSat = null;
  @observable totalReceivedSat = null;
  @observable totalSentSat = null;
  @observable ranking = null;
  @observable blocksStaked = null;
  @observable totalTxCount = null;
  @observable qrc20List = [];
  @observable balanceHistory = [];

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
      log.warningWithToast('common.network.address.failed');
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
    try {
      const res = await this.get(`${this.apiHost}/address/${address}/balance-history`);
      if (res) {
        res.forEach(item => {
          this.balanceHistory.push({
            id: item.id,
            height: item.blockHeight,
            timestamp: item.timestamp,
            amountSat: item.amount,
            balanceSat: item.balance,
            amount: wallet.changeUnitFromSatTo1(item.amount),
            balance: wallet.changeUnitFromSatTo1(item.balance),
          });
        });
      }
    } catch (error) {
      log.warning('common.network.address.failed');
    }
  };
}