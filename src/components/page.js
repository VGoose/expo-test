import React from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import { SafeAreaView } from 'react-native'
import TopBar from './top_bar'


const Page = ({ children, pageName }) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
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


