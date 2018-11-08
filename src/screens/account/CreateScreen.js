import React from 'react';
import { observable, action, set } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  ScrollView,
  View,
} from 'react-native';

import { Container, BigButton } from 'src/components';
import { GesturePassword } from 'src/components/GesturePassword';

import i18n from 'src/i18n';

@inject('stores') @observer
export default class CreateScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t('account.create.title'),
  };

  @observable
  store = {
    step: 1,
    password: '',
    setWarning: false,
    checkWarning: false,
  };

  render() {
    //utils.wallet.encryptAndSaveMnemonic('1 1 1 1 2 2 2 2', '123456');
    return (
      <Container>
        <View style={{ height: 400 }}>
          {this.store.step === 1 && this._renderGesturePassword(i18n.t('account.create.setGesturePassword'), i18n.t('account.create.gesturePasswordRule'), this._setPassword, this.store.setWarning)}
          {this.store.step === 2 && this._renderGesturePassword(i18n.t('account.create.repeatGesturePassword'), i18n.t('account.create.repeatPasswordFail'), this._checkRepeatPassword, this.store.checkWarning)}
        </View>
        <ScrollView/>
        {this.store.step === 2 && (
          <View>
            <BigButton type={'warning'} onPress={this._resetPassword}>
              {i18n.t('account.create.resetPassword')}
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
        hasStatusBar={true}
        isWarning={isWarning}
        onFinish={onFinish}
        warningMessage={warningMessage}
        message={message}
        desc={i18n.t('account.create.gesturePasswordDesc')}
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
      // todo
      /*
      1. generate an address
      2. use password to encrypt the wif and mnemonic
      3. navigate to the home screen
       */
      this.props.navigation.navigate('Home');
    }
  };

  _resetPassword = () => {
    set(this.store, {
      step: 1,
      password: '',
      setWarning: false,
      checkWarning: false,
    });
  };
}
