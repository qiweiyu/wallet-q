import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import NewAccountNavigator from './NewAccountNavigator';
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  NewAccount: NewAccountNavigator,
  Main: MainTabNavigator,
});