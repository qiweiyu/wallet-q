import { AsyncStorage } from 'react-native';
import { observable, action } from 'mobx';
import { log } from 'src/utils';

export default class Wallet {
  @observable address = '';
  @observable hasWif = false;
  @observable hasMnemonic = false;

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
}