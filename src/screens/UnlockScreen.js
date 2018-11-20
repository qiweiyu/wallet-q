import React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

import { Screen } from 'src/components';
import { GesturePassword } from 'src/components/GesturePassword';
import logo from 'assets/images/icon.png';

import i18n from 'src/i18n';
import wallet from 'src/utils/wallet';

@inject('stores') @observer
export default class UnlockScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: null,
      gesturesEnabled: !!params.cancelAble,
    };
  };

  @observable
  store = {
    isError: false,
    cancelAble: true,
    bottomComponentRender: null,
    onUnlock: null,
  };

  onBackButtonPressAndroid = () => {
    // return false, and the default handler will handle it
    // return true, do nothing, so can not cancel
    return !this.store.cancelAble;
  };

  @action
  componentDidMount() {
    this.store.cancelAble = !!this.props.navigation.getParam('cancelAble');
    this.store.messageComponentRender = this.props.navigation.getParam('messageComponentRender');
    this.store.bottomComponentRender = this.props.navigation.getParam('bottomComponentRender');
    this.store.onUnlock = this.props.navigation.getParam('onUnlock');
  };

  @action
  componentWillUnmount() {
    this.props.stores.app.unlockingScreenPopped = false;
  };

  render() {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <Screen>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo}/>
          </View>
          <View style={styles.passwordArea}>
            <GesturePassword
              hasHeader={false}
              isWarning={this.store.isError}
              top={120}
              onFinish={this.handleFinish}
              message={i18n.t('account.unlock.drawGestureToUnlock')}
              warningMessage={i18n.t('account.unlock.drawGestureError')}
            />
          </View>
          <View style={styles.messageContainer}>
            {this.store.messageComponentRender instanceof Function && this.store.messageComponentRender()}
          </View>
          <ScrollView/>
          <View>
            {this.store.bottomComponentRender instanceof Function && this.store.bottomComponentRender(this.dismiss)}
          </View>
        </Screen>
      </AndroidBackHandler>
    );
  }

  @action
  handleFinish = (password) => {
    wallet.decryptLocalSavedWallet(password).then(res => {
      if (!res) {
        this.store.isError = false;
        this.store.isError = true;
      } else {
        if (this.store.onUnlock instanceof Function) {
          this.store.onUnlock(res);
        }
        this.dismiss();
      }
    });
  };

  dismiss = () => {
    this.props.navigation.goBack();
  };
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  passwordArea: {
    height: 300,
  },
  messageContainer: {
    alignItems: 'center',
  },
});