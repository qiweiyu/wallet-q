import { AsyncStorage } from 'react-native';
import { observable, action, set } from 'mobx';
import Model from './model';
import log from 'src/utils/log';
import config from 'src/config';

export default class Wallet extends Model {
  @observable address = '';
  @observable hasWif = false;
  @observable hasMnemonic = false;
  @observable walletInfo = {
    balanceSat: null,
    stakingSat: null,
    matureSat: null,
    totalReceivedSat: null,
    totalSentSat: null,
    ranking: null,
    blocksStaked: null,
    totalTxCount: null,
    qrc20List: [],
  };

  apiHost = config.api.host;

  @action
  async setAddress(address) {
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
  }

  @action
  async getAddress() {
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
  }

  @action
  async delAddress() {
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
  }

  @action
  async fetchWalletInfo(address) {
    try {
      const res = await this.get(`${this.apiHost}/address/${address}`);
      if (res) {
        set(this.walletInfo, {
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
    } catch(error) {
      log.warningWithToast('common.network.address.failed');
    }
  }
}