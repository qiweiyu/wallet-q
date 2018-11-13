import React from 'react';
import {
  Image,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { AuthScreen } from 'src/components';
import { AddressInfo } from 'src/components/Address';
import i18n from 'src/i18n';

@inject('stores') @observer
export default class HomeScreen extends React.Component {
  static navigationOptions = ({}) => {
    return {
      title: i18n.t('wallet.home.title'),
    };
  };

  render() {
    return (
      <AuthScreen>
        <AddressInfo/>
        <FlatList
          style={styles.container}
          data={[{key: 1},{key: 2}, {key: 3}]}
          renderItem={this._renderHistory}
        />
      </AuthScreen>
    );
  }

  _renderHistory = (item) => {
    return (
      <Text>123</Text>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dedede',
  },
});
