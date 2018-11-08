import { AsyncStorage } from 'react-native';
import { observable, action } from 'mobx';
import { log } from 'src/utils';

export default class Wallet {
  @observable address = '';

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
}