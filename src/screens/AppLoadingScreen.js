import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Layout from 'src/constants/Layout';
import utils from 'src/utils';

export default class AppLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this._loading().then(() => {
      this.props.navigation.navigate('RecoverAccount');
    });
  };

  render() {
    return (
      <View>
        <Image
          source={
            require('assets/images/splash.png')
          }
          style={styles.loading}
        />
      </View>
    );
  }

  _loading = async () => {
    await utils.wallet.checkLocalSavedWallet();
  };
}

const styles = StyleSheet.create({
  loading: {
    width: Layout.window.width,
    height: Layout.window.height,
    resizeMode: 'cover',
  },
});