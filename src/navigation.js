"use strict";
import React from 'react'
import { } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from "react-navigation"
import { Ionicons, FontAwesome } from '@expo/vector-icons'

import Home from './containers/home'
import Transit from './containers/transit'
import WeatherScreen from './components/weather_screen'
import SettingsScreen from './components/settings_screen'

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home
    },
    Transit: {
      screen: Transit
    },
    Weather: {
      screen: WeatherScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `newspaper-o`;
          return <FontAwesome name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings`;
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        } else if (routeName === 'Transit') {
          iconName = `md-train`;
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        } else if (routeName === 'Weather') {
          iconName = `ios-rainy`;
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
      },
    }),
    tabBarOptions: {
      activeTintColor: 'rgb(0, 122, 255)',
      inactiveTintColor: 'gray',
    },
  }
)

export default createAppContainer(AppNavigator)