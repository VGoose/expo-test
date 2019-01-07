import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import Swiper from 'react-native-swiper'

import CountdownClock from './countdown_clock'
import { padding, fonts, colors, margin } from '../styles/base'

const TransitModule = ({ scheduleData, isFetching, favoriteStations, nearbyStations, toggleFavorite, fetchSchedule }) => {
  let northSchedule, southSchedule
  const _isFav = (id) => {
    return favoriteStations.some((station) => id === station.stop_id)
  }
  const { schedules = {}, timestamps = [] } = scheduleData
  //TODO add data freshness indicator 
  const favoriteStationsCountdowns = favoriteStations
    .map(station => {
      //keys in schedules are stop_id + N/S
      northSchedule = station.stop_id + 'N' in schedules ? schedules[station.stop_id + 'N'] : [];
      southSchedule = station.stop_id + 'S' in schedules ? schedules[station.stop_id + 'S'] : [];
      return <CountdownClock
        key={station.stop_id}
        id={station.stop_id}
        isFetching={isFetching}
        favorite={toggleFavorite}
        schedules={[
          ...northSchedule,
          ...southSchedule
        ]}
        isFav
        name={station.stop_name}
      />
    })
  const nearbyStationCountdowns = nearbyStations
    .map((station) => {
      northSchedule = station.stop_id + 'N' in schedules ? schedules[station.stop_id + 'N'] : [];
      southSchedule = station.stop_id + 'S' in schedules ? schedules[station.stop_id + 'S'] : [];
      return <CountdownClock
        key={station.stop_id}
        id={station.stop_id}
        favorite={toggleFavorite}
        isFetching={isFetching}
        schedules={[
          ...northSchedule,
          ...southSchedule
        ]}
        isFav={_isFav(station.stop_id)}
        name={station.stop_name}
      />
    })


  return <View style={styles.container}>
    {/* <View style={styles.barContainer}>
      <Text style={styles.barText}>
        Train Schedules
      </Text>
    </View> */}
    <Swiper loop={false} index={0} paginationStyle={styles.paginationStyle} style={styles.swiperContainer}>
      <View style={styles.swiperSlideContainer}>
        <Text style={styles.swiperSlideTitleText}>Nearby Stations</Text>
        <ScrollView refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchSchedule} />}
        >
          {nearbyStationCountdowns}
        </ScrollView>
      </View>
      <View style={styles.swiperSlideContainer}>
        <Text style={styles.swiperSlideTitleText}>Favorite Stations</Text>
        <ScrollView refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchSchedule} />}
        >
          {favoriteStationsCountdowns}
        </ScrollView>
      </View>
    </Swiper>
  </View>
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    backgroundColor: colors.white,
    margin: margin.sm,
    borderRadius: 5,

  },
  barContainer: {
    height: 50,
    padding: padding.sm,
  },
  barText: {
    fontSize: fonts.md,
  },
  swiperContainer: {
    display: 'flex',
  },
  swiperSlideContainer: {
    flex: 1,
    padding: padding.sm,
    // backgroundColor: colors.grey
  },
  swiperSlideTitleText: {
    fontSize: fonts.md
  },
  paginationStyle: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 9,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: padding.sm,
    backgroundColor: 'transparent',
  }
})

export default TransitModule