import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { AppStackNavigator } from './appStackNavigator';
import RequestScreen from '../screens/requestScreen';
import DonateScreen from '../screens/donateScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export const AppTabNavigator = createBottomTabNavigator(
  {
    Donate: { screen: AppStackNavigator, navigationOptions: {
      tabBarIcon: <Image source={require('../assets/request-list.png')}/>,
      tabBarLabel: 'Donate Books'
    }},
    Request: { screen: RequestScreen, navigationOptions: {
      tabBarIcon: <Image source={require('../assets/request-book.png')}/>,
      tabBarLabel: 'Request Books'
    }},
  },
);