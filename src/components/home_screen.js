"use strict";

import React from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'

import Page from './page'
import WeatherModule from './weather_module'
import TransitModule from './transit_module'
import Time from './reusable/time'
import { colors, fonts } from '../styles/base'

const HomeScreen = ({
  //meta
  metaConnectionType,

  //user props
  favoriteStations = [],
  userIsFetching,
  fetchUser,
  toggleFavorite,
  nearbyStations = [],
  isCelsius,
  isNearby,

  //schedule props
  scheduleData = {},
  scheduleIsFetching,
  scheduleLastUpdated,
  scheduleError,
  fetchSchedule,
  //weather props
  weatherIsFetching,
  forecastLocation,
  currentForecast = {},
  hourlyForecast = [],
  weatherError,
  fetchWeather,
}) => {
  if (userIsFetching) {
    return <View></View>
  }
  return (
    <Time>
      {({ time }) => (
        <Page pageName="Home">
          <ScrollView
            contentContainerStyle={{...styles.container, backgroundColor: metaConnectionType === 'none' ? colors.darkGrey : colors.grey}}
            refreshControl={
              <RefreshControl
                refreshing={weatherIsFetching || scheduleIsFetching}
                onRefresh={() => { fetchSchedule(), fetchWeather() }}
              />
            }
          >
            <WeatherModule
              isFetching={weatherIsFetching}
              isCelsius={isCelsius}
              currentForecast={currentForecast}
              weatherError={weatherError}
              fetchWeather={fetchWeather}
              hourlyForecast={hourlyForecast}
              city={forecastLocation}
            />
            <TransitModule
              time={time}
              isNearby={isNearby}
              scheduleLastUpdated={scheduleLastUpdated}
              fetchSchedule={fetchSchedule}
              scheduleData={scheduleData}
              isFetching={scheduleIsFetching || userIsFetching}
              favoriteStations={favoriteStations}
              toggleFavorite={toggleFavorite}
              nearbyStations={nearbyStations}
            />
          </ScrollView>
        </Page>
      )}
    </Time>
  )
}

const OfflineBar = () =>
  <View style={styles.offlineContainer}>
    <Text style={styles.offlineText}>Offline Mode</Text>
  </View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.xlightGrey
  },
  offlineContainer: {
    backgroundColor: colors.darkGrey,
    display: 'flex',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  offlineText: {
    fontSize: fonts.sm
  },
})
export default HomeScreen