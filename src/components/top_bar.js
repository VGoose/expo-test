import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Time from './reusable/time';

import { padding, fonts, colors } from '../styles/base'

const TopBar = ({ page }) => {
  return (
    <View style={styles.container}>
      <Time>
        {({ getTimeHHMM, time, day, month }) => (
          <View style={styles.timeContainer}>
            <Text style={styles.dayText}>{`${day.toUpperCase()} ${month.toUpperCase()} ${time.getDate()}`}</Text>
          </View>
        )}
      </Time>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
		// shadowColor: colors.darkGrey,
		// shadowOffset: {
		// 	width: 3,
		// 	height: 3,
		// },
		// shadowOpacity: .3,
    // shadowRadius: 3,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 50, 
    paddingLeft: padding.sm,
    paddingRight: padding.sm,
  },
  pageName: {
    fontSize: fonts.xl,
    paddingBottom: padding.sm
  },
  timeContainer: {
    display: 'flex',

    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayText: {
    textAlign: 'center',
    fontSize: fonts.lg,
    paddingBottom: padding.sm
  },
  timeText: {
    fontSize: fonts.lg,
    // paddingBottom: padding.sm
  }
})

export default TopBar;