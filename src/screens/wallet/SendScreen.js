import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Slider,
} from 'react-native';
import { observable, set } from 'mobx';
import { inject, observer } from 'mobx-react';

import Colors from 'src/constants/Colors';
import { Screen, BigButton } from 'src/components';

import i18n from 'src/i18n';
import wallet from 'src/utils/wallet';

@inject('stores') @observer
export default class SendScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t('wallet.send.title'),
  };

  @observable
  store = {
    address: 'qZ5PbKt68ijThwBkBCzJhjAvYJuY6KDcFF',
    amount: '0.1',
    feeRate: null,
    minFeeRate: null,
    maxFeeRate: null,
    fee: 0,
    inputs: [],
    outputs: [],
  };

  componentDidMount() {
    this.props.stores.wallet.fetchFeeRate().then(() => {
      const feeRate = this.props.stores.wallet.feeRate;
      set(this.store, {
        feeRate: feeRate,
        minFeeRate: feeRate * 0.5,
        maxFeeRate: feeRate * 3,
      });
    });
  }

  render() {
    return (
      <Screen>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{i18n.t('wallet.send.address')}</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid={'transparent'}
              editable={true}
              value={this.store.address}
              onChangeText={(text) => this.store.address = text}/>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              {i18n.t('wallet.send.amount')}
              ({i18n.t('wallet.send.availableAmount')}{this.props.stores.wallet.mature} QTUM)
            </Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid={'transparent'}
              keyboardType={'numeric'}
              editable={true}
              value={this.store.amount}
              onChangeText={(text) => {
                if (/^\d*\.?\d*$/.test(text)) {
                  this.store.amount = text;
                }
              }}/>
          </View>
          {
            this.store.feeRate && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {i18n.t('wallet.send.feeRate')}
                  ({i18n.t('wallet.send.recommend')}:{this.props.stores.wallet.feeRate})
                </Text>
                <Slider
                  maximumValue={this.store.maxFeeRate}
                  minimumValue={this.store.minFeeRate}
                  value={this.store.feeRate}
                  onValueChange={value => this.store.feeRate = parseFloat(parseFloat(value).toFixed(8))}
                />
                <Text style={styles.inputLabel}>{this.store.feeRate}</Text>
              </View>
            )
          }
        </View>
        <ScrollView/>
        <View>
          <BigButton onPress={this.build}>{i18n.t('wallet.send.build')}</BigButton>
        </View>
      </Screen>
    );
  }

  build = () => {
    if (!this.checkAddress()) {
      return false;
    }
    if (!this.checkAmount()) {
      return false;
    }
    this.calFee().then(res => {
      if (!res) {
        return false;
      }
      const { inputs, outputs, fee } = res;
      set(this.store, {
        inputs,
        outputs,
        fee,
      });
      outputs.forEach((output, index) => {
        output.address = output.address ? output.address : wallet.getDefaultChangeAddress();
        outputs[index] = output;
      });
      this.props.stores.wallet.unlock(this.props.navigation, {
        cancelAble: true,
        messageComponentRender: this.renderUnlockMessage,
        bottomComponentRender: this.renderCancelSend,
        onUnlock: this.onUnlock,
      });
    });
  };

  renderUnlockMessage = () => {
    return (
      <View>
        <Text style={styles.unlockMessageText}>
          {i18n.t('wallet.send.unlockMessage1')}
          <Text style={styles.unlockMessageTextHighlight}>{this.store.amount} QTUM</Text>
          {i18n.t('wallet.send.unlockMessage2')}
        </Text>
        <Text style={[styles.unlockMessageText, styles.unlockMessageTextHighlight]}>{this.store.address}</Text>
        <Text style={styles.unlockMessageText}>
          {i18n.t('wallet.send.fee')}
          <Text style={styles.unlockMessageTextHighlight}>{wallet.changeUnitFromSatTo1(this.store.fee)} QTUM</Text>
        </Text>
      </View>
    );
  };

  renderCancelSend = (dismiss) => {
    return (
      <BigButton type={'warning'} onPress={() => {
        dismiss();
      }}>
        {i18n.t('wallet.send.cancelSend')}
      </BigButton>
    );
  };

  onUnlock = (res) => {
  };

  checkAddress = () => {
    this.store.address = this.store.address.trim();
    let error = null;
    if (this.store.address === '') {
      error = i18n.t('wallet.send.addressEmpty');
    } else if (!wallet.validateAddress(this.store.address)) {
      error = i18n.t('wallet.send.addressError');
    }
    if (error) {
      Alert.alert(
        error,
        i18n.t('wallet.send.addressErrorDesc'),
        [
          {
            text: i18n.t('common.ok'),
          },
        ],
        { cancelable: false });
      return false;
    } else {
      return true;
    }
  };

  checkAmount = () => {
    let error = null;
    if (isNaN(this.store.amount) || this.store.amount <= 0) {
      error = i18n.t('wallet.send.amountError');
    } else if (this.store.amount > parseFloat(this.props.stores.wallet.mature.replace(',', ''))) {
      error = i18n.t('wallet.send.amountTooMuch');
    }
    if (error) {
      Alert.alert(
        error,
        i18n.t('wallet.send.amountErrorDesc'),
        [
          {
            text: i18n.t('common.ok'),
          },
        ],
        { cancelable: false });
      return false;
    } else {
      return true;
    }
  };

  calFee = async () => {
    return new Promise(resolve => {
      this.props.stores.wallet.fetchUtxo().then(utxoList => {
        const { inputs, outputs, fee } = wallet.calFee(utxoList, [{
          address: this.store.address,
          value: wallet.changeUnitFrom1ToSat(this.store.amount),
        }], this.store.feeRate);
        const fee1 = wallet.changeUnitFromSatTo1(fee);
        Alert.alert(
          i18n.t('wallet.send.fee'),
          `${i18n.t('wallet.send.feeAmount')}: ${fee1} QTUM`,
          [
            {
              text: i18n.t('common.cancel'),
              onPress: () => {
                resolve(false);
              },
            },
            {
              text: i18n.t('common.ok'),
              onPress: () => {
                if (!inputs || !outputs) {
                  Alert.alert(
                    i18n.t('wallet.send.fee'),
                    i18n.t('wallet.send.feeAmountTooMuch'),
                    [
                      {
                        text: i18n.t('common.ok'),
                        onPress: () => {
                          resolve(false);
                        },
                      },
                    ],
                    { cancelable: false });
                } else {
                  resolve({ inputs, outputs, fee });
                }
              },
            },
          ],
          { cancelable: false });
      });
    });
  };
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 20,
  },
  inputContainer: {
    marginLeft: 40,
    marginRight: 40,
  },
  inputLabel: {
    fontSize: 12,
    lineHeight: 24,
    color: Colors.primary,
  },
  input: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    padding: 0,
    textAlignVertical: 'top',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 20,
  },
  unlockMessageText: {
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 2,
    marginBottom: 2,
  },
  unlockMessageTextHighlight: {
    fontWeight: 'bold',
  },
});
