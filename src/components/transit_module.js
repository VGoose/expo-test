import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native'
import Carousel from 'react-native-looped-carousel'

import CountdownClock from './countdown_clock'
import { padding, fonts, colors, margin } from '../styles/base'


class TransitModule extends React.Component {
  _renderItem = (item) => {
    const { data, isEmpty, fetch, emptyText, header } = item
    return <Slide
      data={data}
      isEmpty={isEmpty}
      fetch={fetch}
      emptyText={emptyText}
      header={header}
    />
  }
  render() {
    const {
      isNearby: showNearbyStationsFirst,
      scheduleLastUpdated,
      scheduleData = {},
      isFetching,
      favoriteStations,
      nearbyStations,
      toggleFavorite,
      fetchSchedule } = this.props
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
        data: nearbyStationCountdowns,
        isEmpty: isNearbyEmpty,
        fetch: fetchSchedule,
        emptyText: nearbyEmptyText,
        header: "nearby stations",
      },
      {
        data: favoriteStationsCountdowns,
        isEmpty: isFavoriteEmpty,
        fetch: fetchSchedule,
        emptyText: favoriteEmptyText,
        header: "favorite stations",
      }
    ]

    return <Carousel 
          style={styles.container}
          autoplay={false}
          pageInfo
          isLooped={false}
          pageInfoBottomContainerStyle={{ top: 5, right: 5, bottom: undefined, left: undefined }}
          pageInfoBackgroundColor='transparent'
        >
          {this._renderItem(_data[0])}
          {this._renderItem(_data[1])}
        </Carousel>

  }
}
const Slide = ({ header, isEmpty, fetch, emptyText, data }) => {
  return <View style={styles.swiperSlideContainer}>
    <Bar header={header} />
    <ScrollView
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
    elevation: 5,
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
    paddingBottom: 3,
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