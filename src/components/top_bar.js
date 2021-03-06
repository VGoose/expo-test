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
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 40, 
    paddingLeft: padding.sm,
    paddingRight: padding.sm,
  },
  pageName: {
    fontSize: fonts.xl,
    paddingBottom: padding.sm
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: padding.sm,
  },
  dayText: {
    textAlign: 'center',
    fontSize: fonts.lg,
    paddingBottom: padding.sm
  },
  timeText: {
    fontSize: fonts.lg,
  }
})

export default TopBar;