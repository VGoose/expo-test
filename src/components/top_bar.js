import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Time from './reusable/time';

import { padding, fonts } from '../styles/base'

const TopBar = ({ page }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageName}>{page}</Text>
      <Time>
        {({ getTimeHHMM, time, day, month }) => (
          <View style={styles.timeContainer}>
            {/* <Text style={styles.timeText}>{`${getTimeHHMM()}`}</Text> */}
            <Text style={styles.dayText}>{`${day.toUpperCase()} ${month.toUpperCase()} ${time.getDate()}`}</Text>
          </View>
        )}
      </Time>

    </View>
  )
}
const TOP_BAR_HEIGHT = 60

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#d3d3d3',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: TOP_BAR_HEIGHT,
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
    alignItems: 'center'
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