import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import TopBar from './top_bar'


const Page = ({ children, pageName }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <TopBar page={pageName} />
        {children}
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  }
})


export default Page


