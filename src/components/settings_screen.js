"use strict";

import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Page from './page'
const SettingsScreen = () => {
  return (
    <Page pageName="Settings">
      <View style={styles.container}>
        <Text>Seetings screen</Text>
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
export default SettingsScreen