import React from 'react';
import { createStackNavigator } from 'react-navigation';

import NewScreen from 'src/screens/account/NewScreen';
import ImportByMnemonic from 'src/screens/account/ImportByMnemonicScreen';
import ImportByWif from 'src/screens/account/ImportByWifScreen';
import SetPassword from 'src/screens/account/SetPasswordScreen';

export default createStackNavigator({
  NewAccount: NewScreen,
  ImportByMnemonic,
  ImportByWif,
  SetPassword,
});
