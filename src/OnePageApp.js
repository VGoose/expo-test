import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import store from './store'
import { Provider } from 'react-redux'

import { connect } from 'react-redux'

import { 
  askLocationPermission, 
  userToggleFavorite, 
  locateUser, 
  fetchUserIfNeeded,
  setNearbyStations,
  startUpFetch
 } from './actions/user'
import { fetchWeatherIfNeeded } from './actions/weather'
import {
  fetchScheduleIfNeeded
} from './actions/schedule'

export default class OnePageApp extends React.Component {
  componentDidMount() {
    store.dispatch(askLocationPermission())
    store.dispatch(fetchUserIfNeeded())
    store.dispatch(startUpFetch())
    // store.dispatch(fetchScheduleIfNeeded())
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>One Page App</Text>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

