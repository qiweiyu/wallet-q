import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Container, BigButton, MonoText } from 'src/components';

import logo from 'assets/images/icon.png';
import i18n from 'src/i18n';

export default class NewScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={logo}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <MonoText style={styles.getStartedText}>{i18n.t('account.new.welcome1')}</MonoText>

            <View style={styles.sloganContainer}>
              <MonoText>{i18n.t('account.new.welcome2')}</MonoText>
            </View>
          </View>

        </ScrollView>
        <View>
          <BigButton onPress={this._goToCreateAccount}>{i18n.t('account.new.create')}</BigButton>
          <BigButton>{i18n.t('account.new.import')}</BigButton>
        </View>
      </Container>
    );
  }

  _goToCreateAccount = () => {
    this.props.navigation.navigate('CreateAccount');
  }
}

const styles = StyleSheet.create({
    contentContainer: {
      paddingTop: 30,
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
  })
;
