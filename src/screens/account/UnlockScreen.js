import React from 'react';
import { observable, action, set } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  Alert,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { AndroidBackHandler } from 'react-navigation-backhandler';

import { Screen, BigButton } from 'src/components';
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
      gesturesEnabled: params.from !== 'send',
    };
  };

  @observable
  store = {
    isError: false,
    from: '',
  };

  onBackButtonPressAndroid = () => {
    // directly return true, do nothing
    return true;
  };

  componentDidMount() {
    this.props.stores.wallet.unlocking();
    this.store.from = this.props.navigation.getParam('from');
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
          <ScrollView/>
          <View>
            {this.store.from === 'auth' &&
            <BigButton type={'danger'} onPress={this.logout}>
              {i18n.t('account.unlock.logout')}
            </BigButton>}
            {this.store.from === 'send' &&
            <BigButton type={'warning'} onPress={this.warning}>
              {i18n.t('account.unlock.cancelSend')}
            </BigButton>}
          </View>
        </Screen>
      </AndroidBackHandler>
    );
  }

  handleFinish = (password) => {
    if (this.store.from === 'auth') {
      this.unlockFromAuth(password);
    } else if (this.store.from === 'send') {
    }
  };

  @action
  unlockFromAuth = (password) => {
    wallet.decryptLocalSavedWallet(password).then(res => {
      if (!res) {
        this.store.isError = false;
        this.store.isError = true;
      } else {
        set(this.props.stores.wallet, {
          hasWif: !!res.wif,
          hasMnemonic: !!res.mnemonic,
        });
        Toast.show(i18n.t('account.unlock.unlockSuccess'));
        this.props.stores.wallet.unlock();
        this.props.navigation.goBack();
      }
    });
  };

  @action
  logout = () => {
    Alert.alert(
      i18n.t('account.unlock.logout'),
      i18n.t('account.unlock.logoutDesc'),
      [
        {
          text: i18n.t('common.cancel'), onPress: () => {
        },
        },
        {
          text: i18n.t('common.ok'), onPress: () => {
          wallet.destroyWallet().then(() => {
            this.props.navigation.navigate('NewAccount');
          });
        },
        },
      ],
      { cancelable: false });
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
});