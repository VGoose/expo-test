import React from 'react'
import { AppState, StyleSheet, Text, View } from 'react-native'
import store from './store'
import { Provider } from 'react-redux'

import { connect } from 'react-redux'

import { 
  askLocationPermission, 
  userToggleFavorite, 
  fetchUserIfNeeded,
  setNearbyStations,
  startUpFetch
 } from './actions/user'

import {
  fetchScheduleIfNeeded
} from './actions/schedule'

export default class OnePageApp extends React.Component {
  componentDidMount() {
    //addevent listener to appstate change
    store.dispatch(askLocationPermission())
    store.dispatch(fetchUserIfNeeded())
    store.dispatch(startUpFetch())
    // store.dispatch(fetchScheduleIfNeeded())
  }
  componentWillUnmount() {
    //remove event listener for appstate
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

