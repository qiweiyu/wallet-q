import './shim';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import AppNavigator from 'src/navigation/AppNavigator';
import { Container } from 'src/components';
import { Provider } from 'mobx-react';
import stores from 'src/stores';

export default class App extends React.Component {
  render() {
    return (
      <Provider stores={stores}>
        <Container>
          {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
          <AppNavigator/>
        </Container>
      </Provider>
    );
  }
}
