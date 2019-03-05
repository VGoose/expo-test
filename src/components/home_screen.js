"use strict";

import React from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'

import Page from './page'
import WeatherModule from './weather_module'
import TransitModule from './transit_module'
import { fonts, padding } from '../styles/base'

const HomeScreen = ({
  //meta
  metaConnectionType,
  showSpinner,

  //user props
  favoriteStations = [],
  userIsFetching,
  fetchUser,
  toggleFavorite,
  nearbyStations = [],
  isCelsius,
  isNearby,
  userError,
  isLocationEnabled,
  locateUser,
  setNearbyStations,

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
  return (
    <Page pageName="Home">
      {(showSpinner)
        ? <View testID="loading-screen" style={{ position: 'relative', left: 0, height: 1000 }}></View>
        : null
      }
      {isLocationEnabled ? null : <OfflineBar location />}
      <ScrollView
        testID="home-screen"
        contentContainerStyle={{
          ...styles.container,
        }}
        refreshControl={
          <RefreshControl
            // refreshing={scheduleIsFetching || weatherIsFetching}
            refreshing={false}
            onRefresh={() => {
              fetchSchedule()
              fetchWeather()
              locateUser()
                .then(loc => {
                  setNearbyStations()
                })
                .catch()
            }}
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
  )
}

const OfflineBar = ({ location }) =>
  location
    ? <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>
        Please enable location services.
      </Text>
      <Text style={styles.offlineText}>Data displayed may be inaccurate.</Text>
    </View>
    : <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No internet connection.  Operating in offline mode</Text>
    </View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  offlineContainer: {
    display: 'flex',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: padding.sm,
    paddingRight: padding.sm,
    flexDirection: 'column'
  },
  offlineText: {
    fontSize: fonts.sm,
    textAlign: 'center'
  },
})
export default HomeScreen