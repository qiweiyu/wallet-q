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
import Colors from 'src/constants/Colors';
import { AuthScreen } from 'src/components';
import { AddressInfo } from 'src/components/Address';
import i18n from 'src/i18n';
import moment from 'src/utils/moment';

@inject('stores') @observer
export default class HomeScreen extends React.Component {
  static navigationOptions = ({}) => {
    return {
      title: i18n.t('wallet.home.title'),
    };
  };

  componentDidMount() {
    this.props.stores.wallet.fetchHistory();
  }

  render() {
    return (
      <AuthScreen>
        <AddressInfo/>
        <FlatList
          style={styles.container}
          data={this.props.stores.wallet.balanceHistory}
          renderItem={({ item }) => this._renderHistory(item)}
        />
      </AuthScreen>
    );
  }

  _renderHistory = (item) => {
    return (
      <View style={styles.txContainer}>
        <Text>{moment(item.timestamp * 1000).smartFormat()}</Text>
        {item.amountSat > 0 ? (
          <Text style={[styles.txAmountText, styles.txAmountPlus]}>+ {item.amount}
            <Text style={styles.txAmountUnit}> QTUM</Text>
          </Text>
        ) : (
          <Text style={[styles.txAmountText, styles.txAmountMinus]}>{item.amount.replace('-', '- ')}
            <Text style={styles.txAmountUnit}> QTUM</Text>
          </Text>
        )}
        <View style={styles.txBalanceContainer}>
          <Text>{i18n.t('wallet.home.balance')}</Text>
          <Text style={styles.txBalanceText}>{item.balance} QTUM</Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dedede',
  },
  txContainer: {
    backgroundColor: Colors.background,
    margin: 5,
    marginTop: 3,
    marginBottom: 3,
    padding: 5,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
  },
  txAmountText: {
    textAlign: 'right',
    fontSize: 26,
  },
  txAmountUnit: {
    fontSize: 20,
  },
  txAmountPlus: {
    color: '#63b97f',
  },
  txAmountMinus: {
    color: '#d52a29',
  },
  txBalanceContainer: {
    flexDirection: 'row',
  },
  txBalanceText: {
    marginLeft: 'auto',
  }
});
