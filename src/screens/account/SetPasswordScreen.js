import React from 'react';
import { observable, action, set } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  ScrollView,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import { Container, BigButton } from 'src/components';
import { GesturePassword } from 'src/components/GesturePassword';

import i18n from 'src/i18n';
import utils from 'src/utils';

@inject('stores') @observer
export default class SetPasswordScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t('account.setPassword.title'),
  };

  @observable
  store = {
    step: 1,
    password: '',
    setWarning: false,
    checkWarning: false,
  };

  render() {
    return (
      <Container>
        <View style={{ height: 400 }}>
          {this.store.step === 1 && this._renderGesturePassword(i18n.t('account.setPassword.setGesturePassword'), i18n.t('account.setPassword.gesturePasswordRule'), this._setPassword, this.store.setWarning)}
          {this.store.step === 2 && this._renderGesturePassword(i18n.t('account.setPassword.repeatGesturePassword'), i18n.t('account.setPassword.repeatPasswordFail'), this._checkRepeatPassword, this.store.checkWarning)}
        </View>
        <ScrollView/>
        {this.store.step === 2 && (
          <View>
            <BigButton type={'warning'} onPress={this._resetPassword}>
              {i18n.t('account.setPassword.resetPassword')}
            </BigButton>
          </View>
        )}
      </Container>
    );
  }

  _renderGesturePassword(message, warningMessage, onFinish, isWarning) {
    return (
      <GesturePassword
        paddingTop={50}
        hasHeader={true}
        isWarning={isWarning}
        onFinish={onFinish}
        warningMessage={warningMessage}
        message={message}
        desc={i18n.t('account.setPassword.gesturePasswordDesc')}
      />
    );
  }

  @action
  _setPassword = (password) => {
    if (password.length < 4) {
      //如果不先重置为false，那么再次错误线不会变色
      this.store.setWarning = false;
      this.store.setWarning = true;
    } else {
      set(this.store, {
        step: 2,
        password,
      });
    }
  };

  @action
  _checkRepeatPassword = (password) => {
    if (password !== this.store.password) {
      //如果不先重置为false，那么再次错误线不会变色
      this.store.checkWarning = false;
      this.store.checkWarning = true;
    } else {
      this._initWallet(password).then((res) => {
        set(this.props.stores.wallet, {
          hasWif: res.hasWif,
          hasMnemonic: res.hasMnemonic
        });
        Toast.show(i18n.t('account.setPassword.setSuccess'));
        this.props.navigation.navigate('Home');
      });
    }
  };

  _initWallet = async (password) => {
    const type = this.props.navigation.getParam('from', '');
    if (type === 'wif') {
      const wif = this.props.navigation.getParam('wif', '');
      // todo try catch
      await utils.wallet.encryptAndSaveWif(wif, password);
      return {
        hasWif: true,
      };
    } else {
      let mnemonic = '';
      let path = null;
      if (type === 'mnemonic') {
        mnemonic = this.props.navigation.getParam('mnemonic', '');
        path = this.props.navigation.getParam(path, '');
      } else {
        mnemonic = utils.wallet.generateMnemonic();
        path = utils.wallet.getDefaultDerivePath();
      }
      await utils.wallet.encryptAndSaveMnemonic(mnemonic, password, path);
      return {
        hasWif: true,
        hasMnemonic: true,
      };
    }
  };

  @action
  _resetPassword = () => {
    set(this.store, {
      step: 1,
      password: '',
      setWarning: false,
      checkWarning: false,
    });
  };
}
