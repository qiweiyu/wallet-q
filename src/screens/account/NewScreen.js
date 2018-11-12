import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Layout from 'src/constants/Layout';
import { Screen, BigButton } from 'src/components';

import logo from 'assets/images/icon.png';
import i18n from 'src/i18n';

export default class NewScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Screen>
        <View style={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={logo}
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>{i18n.t('account.new.welcome1')}</Text>
            <View style={styles.sloganContainer}>
              <Text>{i18n.t('account.new.welcome2')}</Text>
            </View>
          </View>
        </View>
        <ScrollView/>
        <View>
          <BigButton onPress={this._goToCreateAccount}>{i18n.t('account.new.create')}</BigButton>
          <BigButton onPress={this._goToImportByMnemonic}>{i18n.t('account.new.importByMnemonic')}</BigButton>
          <BigButton onPress={this._goToImportByWif}>{i18n.t('account.new.importByWif')}</BigButton>
        </View>
      </Screen>
    );
  }

  _goToCreateAccount = () => {
    this.props.navigation.navigate('SetPassword');
  };

  _goToImportByMnemonic = () => {
    this.props.navigation.navigate('ImportByMnemonic');
  };

  _goToImportByWif = () => {
    this.props.navigation.navigate('ImportByWif');
  };
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30 + Layout.appBarHeight,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  sloganContainer: {
    marginVertical: 7,
    color: 'rgba(96,100,109, 0.8)',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
});
