"use strict";

import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Page from './page'

const WeatherScreen = () => {
  return (
    <Page pageName="Weather">
      <View style={styles.container}>
        <Text>Weather screen</Text>
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default WeatherScreen