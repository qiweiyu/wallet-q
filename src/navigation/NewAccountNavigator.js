import React from 'react';
import { createStackNavigator } from 'react-navigation';

import NewScreen from 'src/screens/account/NewScreen';
import CreateScreen from 'src/screens/account/CreateScreen';

export default createStackNavigator({
  NewAccount: NewScreen,
  CreateAccount: CreateScreen,
});
