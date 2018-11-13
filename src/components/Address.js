import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import Colors from 'src/constants/Colors';
import i18n from 'src/i18n';

@inject('stores') @observer
export class AddressInfo extends React.Component {

  render() {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.balance}>
          {this.props.stores.wallet.balance}
          <Text style={styles.balanceUnit}> QTUM</Text>
        </Text>
        <Text style={styles.label}>{i18n.t('components.address.address')}</Text>
        <Text style={styles.info}>
          {this.props.stores.wallet.address}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: Colors.primary,
    margin: 3,
    padding: 5,
    paddingLeft: 10,
  },
  balance: {
    color: '#fff',
    fontSize: 25,
  },
  balanceUnit: {
    fontSize: 18,
  },
  label: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 5,
  },
  info: {
    color: '#fff',
    fontSize: 16,
  },
  infoUnit: {
    fontSize: 14,
  },
});