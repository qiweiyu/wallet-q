import React from 'react';
import { Alert, View, TouchableOpacity, Text, AppState } from 'react-native';
import Toast from 'react-native-simple-toast';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import i18n from 'src/i18n';
import wallet from 'src/utils/wallet';
import Styles from 'src/styles';
import Colors from 'src/constants/Colors';

export class Container extends React.Component {
  render() {
    return <View {...this.props} style={[this.props.style, Styles.common.container]}/>;
  }
}

export class Screen extends React.Component {
  render() {
    return <Container {...this.props} style={[this.props.style, Styles.common.container]}/>;
  }
}

@inject('stores') @observer
class AuthScreenNoNav extends React.Component {
  static hasListened = false;
  static appState = null;

  installedListener = false;

  componentDidMount() {
    if (!AuthScreenNoNav.hasListened) {
      AuthScreenNoNav.appState = AppState.currentAppState;
      AppState.addEventListener('change', this._handleAppStateChange);
      this.installedListener = true;
      AuthScreenNoNav.hasListened = true;
    }
    this.checkAndHandleUnlock();
  }

  componentWillUnmount() {
    if (this.installedListener) {
      AppState.removeEventListener('change', this._handleAppStateChange);
      AuthScreenNoNav.hasListened = false;
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if (AuthScreenNoNav.appState === 'background' && nextAppState === 'active') {
      this.checkAndHandleUnlock();
    } else if (nextAppState === 'background') {
      this.props.stores.app.lock();
    }
    AuthScreenNoNav.appState = nextAppState;
  };

  checkAndHandleUnlock = () => {
    if (this.props.stores.app.isLocking()) {
      this.props.stores.app.unlock(this.props.navigation, {
        bottomComponentRender: this.renderLogout,
        onUnlock: this.onUnlock,
      });
    }
  };

  onUnlock = () => {
    Toast.show(i18n.t('account.auth.unlockSuccess'));
  };

  logout = () => {
    Alert.alert(
      i18n.t('account.auth.logout'),
      i18n.t('account.auth.logoutDesc'),
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

  renderLogout = () => {
    return (
      <BigButton type={'danger'} onPress={this.logout}>
        {i18n.t('account.auth.logout')}
      </BigButton>
    );
  };

  render() {
    return <Screen {...this.props}/>;
  }
}

export const AuthScreen = withNavigation(AuthScreenNoNav);

export class BigButton extends React.Component {
  render() {
    let color = '';
    switch (this.props.type) {
      case 'warning':
        color = 'warning';
        break;
      case 'danger':
        color = 'danger';
        break;
      default:
        color = 'primary';
    }
    return <View style={Styles.common.buttonContainer}>
      <TouchableOpacity style={[Styles.common.button, { backgroundColor: Colors[color] }]} onPress={
        this.props.onPress ? this.props.onPress : () => {
        }
      }>
        <Text style={Styles.common.buttonText}>{this.props.children}</Text>
      </TouchableOpacity>
    </View>;
  }
}