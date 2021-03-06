import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import Carousel from 'react-native-looped-carousel'

import CountdownClock from './countdown_clock'
import { padding, fonts, colors, margin } from '../styles/base'

import ModuleLoader from './module_loader'

const TransitModule = ({
  isNearby: showNearbyStationsFirst,
  scheduleData = {},
  isFetching,
  favoriteStations,
  nearbyStations,
  toggleFavorite,
  fetchSchedule }) => {
  const _renderItem = (item) => {
    const { data, isEmpty, fetch, emptyText, header, id } = item
    return <Slide
      isFetching={isFetching}
      id={id}
      data={data}
      isEmpty={isEmpty}
      fetch={fetch}
      emptyText={emptyText}
      header={header}
    />
  }
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
        tID={`clock-1-${station.stop_id}`}
        defaultOpen
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
    .map((station, index) => {
      northSchedule = station.stop_id + 'N' in scheduleData ? scheduleData[station.stop_id + 'N'] : [];
      southSchedule = station.stop_id + 'S' in scheduleData ? scheduleData[station.stop_id + 'S'] : [];
      return <CountdownClock
        tID={`clock-0-${station.stop_id}`}
        defaultOpen={index == 0 ? true : false}
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
  const isNearbyEmpty = nearbyStationCountdowns.length === 0
  const isFavoriteEmpty = favoriteStationsCountdowns.length === 0
  const nearbyEmptyText = "There are no stations nearby."
  const favoriteEmptyText = "You haven't added any stations to your favorites.  \
  Press on the station pins to add stations to your list."

  const _data = [
    {
      id: 0,
      data: nearbyStationCountdowns,
      isEmpty: isNearbyEmpty,
      fetch: fetchSchedule,
      emptyText: nearbyEmptyText,
      header: "nearby stations",
    },
    {
      id: 1,
      data: favoriteStationsCountdowns,
      isEmpty: isFavoriteEmpty,
      fetch: fetchSchedule,
      emptyText: favoriteEmptyText,
      header: "favorite stations",
    }
  ]
  return <View testID={'transit-module'} style={styles.container}>
    
    <Carousel
      style={{ flex: 1 }}
      autoplay={false}
      pageInfo
      currentPage={showNearbyStationsFirst ? 0 : 1}
      isLooped={false}
      pageInfoTextStyle={{ fontSize: fonts.md }}
      pageInfoBottomContainerStyle={{ top: 5, right: -10, bottom: undefined, left: undefined }}
      pageInfoBackgroundColor='transparent'
    >
      {_renderItem(_data[0])}
      {_renderItem(_data[1])}
    </Carousel>
  </View>
}
const Slide = ({ header, isEmpty, fetch, emptyText, data, id, isFetching }) => {
  return <View style={styles.swiperSlideContainer} testID="transit-slide">
    <Bar header={header} />
    {isFetching ? <ModuleLoader /> : null}
    <ScrollView
      testID={`countdown-list-${id}`}
      // contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={fetch} />}
    >
      {isEmpty
        ? <Text style={styles.noNearbyText}>{emptyText}</Text>
        : data
      }
    </ScrollView>
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
    backgroundColor: colors.lightGrey,
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
  },
  noNearbyText: {
    textAlign: 'center',
    paddingTop: padding.md,
  }
})

export default TransitModule