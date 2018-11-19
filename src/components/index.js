import React from 'react';
import { View, TouchableOpacity, Text, AppState } from 'react-native';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
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

@inject('stores')@observer
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
      this.props.stores.wallet.lock();
    }
    AuthScreenNoNav.appState = nextAppState;
  };

  checkAndHandleUnlock = () => {
    if (this.props.stores.wallet.isLocking()) {
      this.popUnlockScreen();
    }
  };

  popUnlockScreen = () => {
    this.props.navigation.navigate('UnlockScreen', {
      from: 'auth',
    });
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