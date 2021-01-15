import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import DonateScreen from '../screens/donateScreen';
import ReceiverDetailsScreen from '../screens/receiverDetailScreen';

export const AppStackNavigator = createStackNavigator({
  bookDonateList: {
    screen: DonateScreen
  },
  receiverDetails: {
    screen: ReceiverDetailsScreen
  }
},
  {initialRouteName: 'bookDonateList'}
)