import './shim';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import AppNavigator from 'src/navigation/AppNavigator';
import { Container } from 'src/components';
import AppLoadingScreen from 'src/screens/AppLoadingScreen';
import { observable } from 'mobx';
import { Provider, observer } from 'mobx-react';
import stores from 'src/stores';

@observer
export default class App extends React.Component {
  @observable
  store = {
    isComplete: false,
  };

  render() {
    if (!this.store.isComplete) {
      return (
        <AppLoadingScreen
          onFinish = {this._onFinish}
        />
      );
    } else {
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

  _onFinish = () => {
    this.store.isComplete = true;
  }
}
