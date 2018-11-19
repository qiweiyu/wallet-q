import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Colors from 'src/constants/Colors';
import { Screen, BigButton } from 'src/components';

import i18n from 'src/i18n';
import wallet from 'src/utils/wallet';

@observer
export default class ImportByWifScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t('account.new.importByWif'),
  };

  @observable
  store = {
    input: '',
  };

  render() {
    return (
      <Screen>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{i18n.t('account.import.wifLabel')}</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid={'transparent'}
              editable={true}
              multiline={true}
              value={this.store.input}
              onChangeText={(text) => this.store.input = text}/>
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
    this.store.input = this.store.input.trim();
    if (this.store.input === '') {
      Alert.alert(
        i18n.t('account.import.wifEmpty'),
        i18n.t('account.import.wifErrorDesc'),
        [
          {
            text: i18n.t('common.ok'), onPress: () => {
          },
          },
        ],
        { cancelable: false });
    } else if (!wallet.validateWif(this.store.input)) {
      Alert.alert(
        i18n.t('account.import.wifError'),
        i18n.t('account.import.wifErrorDesc'),
        [
          {
            text: i18n.t('common.ok'), onPress: () => {
          },
          },
        ],
        { cancelable: false });
    } else {
      this._goToSetPassword();
    }
  };

  _goToSetPassword = () => {
    this.props.navigation.navigate('SetPassword', {
      from: 'wif',
      wif: this.store.input,
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
});
