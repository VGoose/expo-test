import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import Swiper from 'react-native-swiper'

import CountdownClock from './countdown_clock'
import { padding, fonts, colors, margin } from '../styles/base'


const TransitModule = ({
  isNearby: showNearbyStationsFirst,
  scheduleLastUpdated,
  time,
  scheduleData = {},
  isFetching,
  favoriteStations,
  nearbyStations,
  toggleFavorite,
  fetchSchedule }) => {

  const isFresh = (time - scheduleLastUpdated) < 60 * 1000
  const statusColor = isFresh ? colors.OK : colors.warning

  //make countdown clocks from schedule scheduleData
  const { schedules = {}, timestamps = [] } = scheduleData
  let northSchedule, southSchedule
  const _isFav = (id) => {
    return favoriteStations.some((station) => id === station.stop_id)
  }
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
      southSchedule = station.stop_id + '' in schedules ? schedules[station.stop_id + 'S'] : [];
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


  return <View style={{...styles.container}}>
    {showNearbyStationsFirst //alignment issue with index prop of Swiper
      ? <Swiper loop={false} paginationStyle={styles.paginationStyle} style={styles.swiperContainer}>
        <View style={styles.swiperSlideContainer}>
          <Bar header="Nearby Stations" statusColor={statusColor} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={fetchSchedule} />}
          >
            {nearbyStationCountdowns}
          </ScrollView>
        </View>
        <View style={styles.swiperSlideContainer}>
          <Bar header="Favorite Stations" statusColor={statusColor} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={fetchSchedule} />}
          >
            {favoriteStationsCountdowns}
          </ScrollView>
        </View>
      </Swiper>
      : <Swiper loop={false} paginationStyle={styles.paginationStyle} style={styles.swiperContainer}>
        <View style={styles.swiperSlideContainer}>
          <Bar header="Favorite Stations" statusColor={statusColor} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={fetchSchedule} />}
          >
            {favoriteStationsCountdowns}
          </ScrollView>
        </View>
        <View style={styles.swiperSlideContainer}>
          <Bar header="Nearby Stations" statusColor={statusColor} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={fetchSchedule} />}
          >
            {nearbyStationCountdowns}
          </ScrollView>
        </View>
      </Swiper>}
  </View>
}
const Bar = ({ header, statusColor }) => {
  return (
    <View style={{...styles.barContainer, borderColor: statusColor}}>
      <Text style={styles.barText}>{header}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 250,
    // display: 'flex',
    backgroundColor: colors.white,
    margin: margin.sm,
    borderRadius: 5,

  },
  barContainer: {
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 30,
    padding: padding.xs,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 2,
    borderColor: colors.danger
    // marginLeft: -2,
    // marginRight: -2
  },
  barText: {
    fontSize: fonts.md,
  },
  swiperContainer: {
    display: 'flex',
  },
  swiperSlideContainer: {
    flex: 1,
    padding: 2,
    paddingTop: 0,
    backgroundColor: colors.grey,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: colors.white,
  },
  scrollView: {
    paddingTop: padding.xxs,
  },
  paginationStyle: {
    bottom: 0,
    left: 0,
    right: -2,
    top: 4,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: padding.sm,
    backgroundColor: 'transparent',
  }
})

export default TransitModule