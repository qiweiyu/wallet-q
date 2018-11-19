import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import QRCode from 'react-native-qrcode';
import Colors from 'src/constants/Colors';
import { AuthScreen } from 'src/components';
import i18n from 'src/i18n';

@inject('stores') @observer
export default class ReceiveScreen extends React.Component {
  static navigationOptions = ({}) => {
    return {
      title: i18n.t('wallet.receive.title'),
    };
  };

  @observable
  store = {
    amount: '0.0',
  };

  render() {
    return (
      <AuthScreen>
        <View style={styles.container}>
          <View style={styles.codeContainer}>
            <Text style={styles.amountLabel}>{i18n.t('wallet.receive.amount')}</Text>
            <TextInput
              style={styles.amount}
              underlineColorAndroid={"transparent"}
              keyboardType={'numeric'}
              editable={true}
              value={this.store.amount}
              onChangeText={this.onInputAmount}/>
            <QRCode
              style={styles.code}
              value={`qtum:${this.props.stores.wallet.address}?amount=${this.store.amount}`}
              size={200}
              bgColor={Colors.primary}
            />
            <Text style={styles.address}>{this.props.stores.wallet.address}</Text>
          </View>
        </View>
      </AuthScreen>
    );
  }

  onInputAmount = (text) => {
    if (/^\d*\.?\d*$/.test(text)) {
      this.store.amount = text;
    }
  };
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
      alignItems: 'center',
    },
    codeContainer: {
      height: 340,
      width: 300,
      marginTop: 50,
      backgroundColor: '#fff',
      borderRadius: 20,
      alignItems: 'center',
    },
    amountLabel: {
      width: 200,
      marginTop: 20,
      color: '#999',
      fontSize: 12,
    },
    amount: {
      width: 200,
      marginBottom: 20,
      padding: 0,
      color: Colors.primary,
      borderBottomColor: Colors.primary,
      borderBottomWidth: 2,
      fontSize: 16,
    },
    code: {},
    address: {
      marginTop: 20,
      fontSize: 12,
      color: Colors.primary,
    },
  },
);
