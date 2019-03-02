"use strict";
import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from "react-navigation"

import Home from './containers/home'
import Transit from './containers/transit'
import SettingScreen from './components/settings_screen'
import { margin } from './styles/base';

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarTestID: 'home-tab'
      }
    },
    Transit: {
      screen: Transit,
      navigationOptions: {
        tabBarTestID: 'transit-tab'
      }
    },
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarTestID: 'settings-tab'
      }
    },
  },
  {

    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon
        if (routeName === 'Home') {
          icon = focused
            ? require('./assets/icons/home_a.png')
            : require('./assets/icons/home.png')
          return <Image source={icon} />
        } else if (routeName === 'Settings') {
          icon = focused
            ? require('./assets/icons/setting_a.png')
            : require('./assets/icons/setting.png')
          return <Image source={icon} />
        } else if (routeName === 'Transit') {
          icon = focused
            ? require('./assets/icons/train_a.png')
            : require('./assets/icons/train.png')
          return <Image source={icon} />

        }
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        borderTopWidth: 0,
        height: 50,
        marginTop: margin.md,
        marginBottom: margin.sm,
      },

    },
  }
)

export default createAppContainer(AppNavigator)