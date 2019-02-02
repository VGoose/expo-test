import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { fonts, colors, padding, margin } from '../styles/base';

import Bio from './bio'

class AboutDetail extends React.Component {
  static navigationOptions = {
    title: 'ABOUT',

  }
  //TODO: link email
  render() {
    return <View style={styles.container}>
      <Bio />
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.aboutText}>
            I created this app to get you out the door quicker.
            It lets you know what kind of weather you're in for and
            what time the train is getting to your station.
          </Text>
          <Text style={{...styles.aboutText, ...styles.paragraph }}>
            Right now
            it only really supports New York City (MTA Subway System).
            This might change in the future.
        </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.thanksText}>
            Thanks for using my app.
        </Text>
        </View>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: padding.sm,
  },
  aboutText: {
    fontSize: fonts.md,
    // marginBottom: margin.sm
    // textAlign: 'center'
  },
  thanksText: {
    fontSize: fonts.lg,
    // textAlign: 'center'
  },
  paragraph: {
    marginTop: margin.md
  }
})

export default AboutDetail