import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import { margin, fonts } from '../styles/base'

const Bio = () => {
  return <View style={styles.bioContainer}>
    <Image style={styles.bioImage} source={require('../assets/icons/bio_logo.png')} />
    <View style={styles.bioDesc}>
      <Text style={styles.bioDescText}>
        gogonow
      </Text>
      <Text style={styles.bioDescTextName}>
        Anh Vo
      </Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: '100%',
    color: 'transparent',
  },
  bioImage: {
    borderRadius: 5,
    marginRight: margin.md,
  },
  bioDesc: {

  },
  bioDescText: {
    fontSize: fonts.md
  }
})

export default Bio