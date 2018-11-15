import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import i18n from 'src/i18n';

import HomeScreen from 'src/screens/wallet/HomeScreen';
import ReceiveScreen from 'src/screens/wallet/ReceiveScreen';
import SendScreen from 'src/screens/wallet/SendScreen';
import SettingsScreen from 'src/screens/SettingsScreen';

import TabBarIcon from 'src/components/TabBarIcon';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: i18n.t('wallet.home.title'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'wallet'}
    />
  ),
};

const ReceiveStack = createStackNavigator({
  ReceiveScreen,
});

ReceiveStack.navigationOptions = {
  tabBarLabel: i18n.t('wallet.receive.title'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'qrcode'}
    />
  ),
};

const SendStack = createStackNavigator({
  SendScreen,
});

SendStack.navigationOptions = {
  tabBarLabel: i18n.t('wallet.send.title'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'transfer'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'settings' + (focused ? '' : '-outline')}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ReceiveStack,
  SendStack,
  SettingsStack,
});
