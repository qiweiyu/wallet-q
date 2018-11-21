import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { observable, action, set } from 'mobx';
import { observer, inject } from 'mobx-react';
import Colors from 'src/constants/Colors';
import { AuthScreen } from 'src/components';
import { AddressInfo } from 'src/components/Address';
import { LoadingMore } from 'src/components/LoadingMore';
import i18n from 'src/i18n';
import moment from 'src/utils/moment';

@inject('stores') @observer
export default class HomeScreen extends React.Component {
  static navigationOptions = ({}) => {
    return {
      title: i18n.t('wallet.home.title'),
    };
  };

  @observable
  store = {
    onRefresh: true,
    onLoadingEnd: false,
    reachTxBottom: false,
  };

  componentDidMount() {
    this.store.onRefresh = true;
    this.props.stores.wallet.fetchWalletInfo().then(() => {
      this._onRefresh();
    });
  }

  render() {
    return (
      <AuthScreen>
        <AddressInfo/>
        <FlatList
          style={styles.container}
          data={this.props.stores.wallet.balanceHistory}
          renderItem={({ item }) => this._renderHistory(item)}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.3}
          refreshing={this.store.onRefresh}
          onRefresh={this._onRefresh}
          ListFooterComponent={<LoadingMore noMore={this.store.reachTxBottom && this.props.stores.wallet.balanceHistory.length} onLoading={this.store.onLoadingEnd} showEmpty={this.props.stores.wallet.balanceHistory.length === 0 && !this.store.onRefresh}/>}
        />
      </AuthScreen>
    );
  }

  _renderHistory = (item) => {
    return (
      <View style={styles.txContainer}>
        <View style={styles.txInfoContainer}>
          <View style={[styles.txAmountTag, styles[`typeTag${item.type}`]]}>
            <Text style={styles.txAmountTagText}>{i18n.t(`common.tx.type.${item.type}`)}</Text>
          </View>
          {
            item.timestamp ? (
              <Text> {moment(item.timestamp * 1000).smartFormat()}</Text>
            ) : (
              <Text> {i18n.t('wallet.home.packaging')}</Text>
            )
          }
        </View>
        {item.amountSat > 0 ? (
          <View style={styles.txAmountContainer}>
            <Text style={[styles.txAmountText, styles.txAmountPlus]}>+ {item.amount}
              <Text style={styles.txAmountUnit}> QTUM</Text>
            </Text>
          </View>
        ) : (
          <View style={styles.txAmountContainer}>
            <Text style={[styles.txAmountText, styles.txAmountMinus]}>{item.amount.replace('-', '- ')}
              <Text style={styles.txAmountUnit}> QTUM</Text>
            </Text>
          </View>
        )}
        <View style={styles.txBalanceContainer}>
          <Text>{i18n.t('wallet.home.balance')}</Text>
          <Text style={styles.txBalanceText}>{item.balance} QTUM</Text>
        </View>
      </View>
    );
  };

  @action
  _onEndReached = () => {
    if (!(this.store.reachTxBottom || this.store.onLoadingEnd || this.store.onRefresh)) {
      this.store.onLoadingEnd = true;
      this.props.stores.wallet.fetchHistory().then((reachBottom) => {
        set(this.store, {
          onLoadingEnd: false,
          reachTxBottom: reachBottom,
        });
      });
    }
  };


  @action
  _onRefresh = () => {
    set(this.store, {
      onRefresh: true,
      reachTxBottom: false,
      onLoadingEnd: false,
    });
    this.props.stores.wallet.fetchHistory(this.props.stores.wallet.address, true).then((reachBottom) => {
      set(this.store, {
        onRefresh: false,
        reachTxBottom: reachBottom,
      });
    });
  };
}

const styles = StyleSheet.create(
  {
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
    txInfoContainer: {
      flexDirection: 'row',
    },
    txAmountContainer: {
      flexDirection: 'row',
    },
    txAmountTag: {
      backgroundColor: Colors.primary,
      borderRadius: 5,
    },
    txAmountTagText: {
      color: Colors.textInPrimary,
    },
    txAmountText: {
      marginLeft: 'auto',
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
    },
    typeTagstaking: {
      backgroundColor: '#ffc73c',
    },
    typeTagreceive: {
      backgroundColor: '#63b97f',
    },
    typeTagsend: {
      backgroundColor: '#d52a29',
    },
  },
);
