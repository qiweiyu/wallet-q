import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import Layout from 'src/constants/Layout';
import wallet from 'src/utils/wallet';
import { Screen } from 'src/components';
import { inject, observer } from 'mobx-react';

@inject('stores') @observer
export default class AppLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this._loading().then(() => {
      let nextScreen = 'NewAccount';
      if (this.props.stores.wallet.address) {
        nextScreen = 'RecoverAccount';
      }
      this.props.navigation.navigate(nextScreen);
    });
  };

  render() {
    return (
      <Screen>
        <Image
          source={
            require('assets/images/splash.png')
          }
          style={styles.loading}
        />
      </Screen>
    );
  }

  _loading = async () => {
    await wallet.checkLocalSavedWallet();
  };
}

const styles = StyleSheet.create({
  loading: {
    width: Layout.window.width,
    height: Layout.window.height,
    resizeMode: 'cover',
  },
});