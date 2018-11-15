import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from 'src/screens/wallet/HomeScreen';
import LinksScreen from 'src/screens/LinksScreen';
import SettingsScreen from 'src/screens/SettingsScreen';

import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = (<Icon name="rocket" size={30} color="#900"/>);

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: myIcon,
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
