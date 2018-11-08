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

import { Container, BigButton } from 'src/components';
import { GesturePassword } from 'src/components/GesturePassword';
import logo from 'assets/images/icon.png';

import i18n from 'src/i18n';
import utils from 'src/utils';

@inject('stores') @observer
export default class RecoverScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  @observable
  store = {
    isError: false,
  };

  render() {
    return (
      <Container>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}></Image>
        </View>
        <View style={styles.passwordArea}>
          <GesturePassword
            hasHeader={false}
            isWarning={this.store.isError}
            top={120}
            onFinish={this._checkPassword}
            message={i18n.t('account.recover.drawGestureToUnlock')}
            warningMessage={i18n.t('account.recover.drawGestureError')}
          />
        </View>
        <ScrollView/>
        <View>
          <BigButton type={'danger'} onPress={this._logout}>
            {i18n.t('account.recover.logout')}
          </BigButton>
        </View>
      </Container>
    );
  }

  @action
  _checkPassword = (password) => {
    utils.wallet.decryptLocalSavedWallet(password).then(res => {
      if (!res) {
        this.store.isError = false;
        this.store.isError = true;
      } else {
        set(this.props.stores.wallet, {
          hasWif: !!res.wif,
          hasMnemonic: !!res.mnemonic
        });
        Toast.show(i18n.t('account.recover.unlockSuccess'));
        this.props.navigation.navigate('Home');
      }
    });
  };

  @action
  _logout = () => {
    Alert.alert(
      i18n.t('account.recover.logout'),
      i18n.t('account.recover.logoutDesc'),
      [
        {
          text: 'Cancel', onPress: () => {
        },
        },
        { text: 'OK', onPress: () => {
          utils.wallet.destroyWallet().then(() => {
            this.props.navigation.navigate('NewAccount');
          });
        } },
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
  }
});