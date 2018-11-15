import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from 'src/screens/wallet/HomeScreen';
import LinksScreen from 'src/screens/LinksScreen';
import SettingsScreen from 'src/screens/SettingsScreen';

import TabBarIcon from 'src/components/TabBarIcon';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-wallet`
          : 'md-wallet'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
