import { observable, action } from 'mobx';

export default class App {
  @observable lockStatus = 'lock';
  @observable unlockingScreenPopped = false;

  @action
  lock = () => {
    this.lockStatus = 'lock';
  };

  @action
  unlock = (navigation, options = {}) => {
    if (this.unlockingScreenPopped) {
      return null;
    }
    navigation.navigate('UnlockScreen', {
      cancelAble: false,
      bottomComponentRender: options.bottomComponentRender,
      onUnlock: (...args) => {
        if (options.onUnlock instanceof Function) {
          options.onUnlock(...args);
        }
        this.lockStatus = 'unlock';
      },
    });
  };

  isLocking = () => {
    return this.lockStatus === 'lock';
  };
}