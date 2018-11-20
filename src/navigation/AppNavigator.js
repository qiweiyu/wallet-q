import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import NewAccountNavigator from './NewAccountNavigator';
import MainTabNavigator from './MainTabNavigator';
import AppLoadingScreen from 'src/screens/AppLoadingScreen';
import UnlockScreen from 'src/screens/UnlockScreen';

const RootStack = createSwitchNavigator({
  AppLoadingScreen,
  NewAccount: NewAccountNavigator,
  Main: MainTabNavigator,
});

export default createStackNavigator({
    RootStack,
    UnlockScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);