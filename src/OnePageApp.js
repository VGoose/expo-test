"use strict";
import React from 'react'
import { AppState, StyleSheet, ActivityIndicator } from 'react-native'
import store from './store'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import AppNav from './navigation'
import startUpFetch from './start_up'

export default class OnePageApp extends React.Component {
  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
    startUpFetch()
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }
  handleAppStateChange = (appState) => {
    if (appState === "active") {
      startUpFetch()
    }
  }
  render() {
    return (
      <Provider store={store}>
        <AppNav />
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

