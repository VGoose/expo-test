import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import Swiper from 'react-native-swiper'

import CountdownClock from './countdown_clock'
import { padding, fonts, colors, margin } from '../styles/base'


const TransitModule = ({
  isNearby: showNearbyStationsFirst,
  scheduleLastUpdated,

  scheduleData = {},
  isFetching,
  favoriteStations,
  nearbyStations,
  toggleFavorite,
  fetchSchedule }) => {

  const isEmpty = Object.entries(scheduleData).length === 0 && scheduleData.constructor === Object

  //make countdown clocks from schedule scheduleData
  
  let northSchedule, southSchedule
  const _isFav = (id) => {
    return favoriteStations.some((station) => id === station.stop_id)
  }
  //TODO add data freshness indicator 
  const favoriteStationsCountdowns = favoriteStations
    .map(station => {
      //keys in schedules are stop_id + N/S
      northSchedule = station.stop_id + 'N' in scheduleData ? scheduleData[station.stop_id + 'N'] : [];
      southSchedule = station.stop_id + 'S' in scheduleData ? scheduleData[station.stop_id + 'S'] : [];
      return <CountdownClock
        key={station.stop_id}
        id={station.stop_id}
        isFetching={isFetching}
        toggleFavorite={toggleFavorite}
        schedules={[
          ...southSchedule,
          ...northSchedule
        ]}
        isFav
        name={station.stop_name}
      />
    })
  const nearbyStationCountdowns = nearbyStations
    .map((station) => {
      northSchedule = station.stop_id + 'N' in scheduleData ? scheduleData[station.stop_id + 'N'] : [];
      southSchedule = station.stop_id + 'S' in scheduleData ? scheduleData[station.stop_id + 'S'] : [];
      return <CountdownClock
        isNearby
        key={station.stop_id}
        id={station.stop_id}
        toggleFavorite={toggleFavorite}
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
          <Bar header="nearby stations"  />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={fetchSchedule} />}
          >
            {nearbyStationCountdowns}
          </ScrollView>
        </View>
        <View style={styles.swiperSlideContainer}>
          <Bar header="favorite stations"  />
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
          <Bar header="favorite stations"  />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={fetchSchedule} />}
          >
            {favoriteStationsCountdowns}
          </ScrollView>
        </View>
        <View style={styles.swiperSlideContainer}>
          <Bar header="nearby stations" />
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
const Bar = ({ header }) => {
  return (
    <View style={styles.barContainer}>
      <Text style={styles.barText}>{header}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
		shadowColor: colors.darkGrey,
		shadowOffset: {
			width: 3,
			height: 3,
		},
		shadowOpacity: .5,
		shadowRadius: 3,
    flex: 1,
    backgroundColor: colors.white,
    margin: margin.md,
    borderRadius: 10,
  },
  barContainer: {
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 30,
    padding: padding.xs,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  barText: {
    fontSize: fonts.md,
  },
  swiperContainer: {
    display: 'flex',
  },
  swiperSlideContainer: {
    flex: 1,
    overflow: 'hidden',
    paddingTop: 0,
    borderRadius: 10,
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