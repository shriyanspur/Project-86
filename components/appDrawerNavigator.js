import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './appTabNavigator';
import CustomSideBarMenu from './customSideBarMenu';
import SettingScreen from '../screens/settingScreen';
import MyDonationsScreen from '../screens/myDonationsScreen';
import NotificationScreen from '../screens/notificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {screen: AppTabNavigator},
    MyDonations: {screen: MyDonationsScreen},
    Notifications: {screen: NotificationScreen},
    Settings: {screen: SettingScreen}
},
    {contentComponent: CustomSideBarMenu},
    {initialRouteName: 'Home'}
)