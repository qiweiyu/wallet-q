import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Colors from 'src/constants/Colors';
import { Screen, BigButton } from 'src/components';

import i18n from 'src/i18n';
import wallet from 'src/utils/wallet';

@observer
export default class ImportByMnemonicScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t('account.new.importByMnemonic'),
  };

  @observable
  store = {
    input: '',
    path: wallet.getDefaultDerivePath(),
  };

  render() {
    return (
      <Screen>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{i18n.t('account.import.mnemonicLabel')}</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid={'transparent'}
              editable={true}
              multiline={true}
              value={this.store.input}
              onChangeText={(text) => this.store.input = text}/>
            <Text style={styles.inputLabel}>{i18n.t('account.import.pathLabel')}</Text>
            <TextInput
              style={styles.path}
              editable={true}
              multiline={false}
              value={this.store.path}
              onChangeText={(text) => this.store.path = text}/>
          </View>
        </View>
        <ScrollView/>
        <View>
          <BigButton onPress={this._confirm}>{i18n.t('account.import.confirm')}</BigButton>
        </View>
      </Screen>
    );
  }

  _confirm = () => {
    if (this.store.input === '') {
      Alert.alert(
        i18n.t('account.import.mnemonicEmpty'),
        i18n.t('account.import.mnemonicErrorDesc'),
        [
          {
            text: 'Cancel', onPress: () => {},
          },
          {
            text: 'OK', onPress: () => {this._goToSetPassword();},
          },
        ],
        { cancelable: false });
    } else if (!wallet.validateMnemonic(this.store.input)) {
      Alert.alert(
        i18n.t('account.import.mnemonicError'),
        i18n.t('account.import.mnemonicErrorDesc'),
        [
          {
            text: 'Cancel', onPress: () => {},
          },
          {
            text: 'OK', onPress: () => {this._goToSetPassword();},
          },
        ],
        { cancelable: false });
    } else {
      this._goToSetPassword();
    }
  };

  _goToSetPassword = () => {
    this.props.navigation.navigate('SetPassword', {
      from: 'mnemonic',
      mnemonic: this.store.input,
      path: this.store.path,
    });
  };
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop:  20
  },
  inputContainer: {
    marginLeft: 40,
    marginRight: 40,
  },
  inputLabel: {
    fontSize: 17,
    lineHeight: 24,
    color: Colors.primary,
  },
  input: {
    borderColor: '#999',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 0,
    textAlignVertical: 'top',
    fontSize: 14,
    lineHeight: 18,
    height: 80,
    marginBottom: 20,
  },
  path: {
    borderColor: '#999',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    padding: 0,
    textAlignVertical: 'top',
    fontSize: 14,
    lineHeight: 18,
    height: 24,
    marginBottom: 20,
  },
});
