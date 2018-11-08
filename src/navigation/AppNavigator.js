import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import NewAccountNavigator from './NewAccountNavigator';
import MainTabNavigator from './MainTabNavigator';
import AppLoadingScreen from 'src/screens/AppLoadingScreen';
import RecoverScreen from 'src/screens/account/RecoverScreen';

export default createSwitchNavigator({
  AppLoadingScreen,
  NewAccount: NewAccountNavigator,
  RecoverAccount: RecoverScreen,
  Main: MainTabNavigator,
});