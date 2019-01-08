"use strict";

import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Page from './page'
import CountdownClock from './countdown_clock'
import WeatherModule from './weather_module'
import TransitModule from './transit_module'

const HomeScreen = ({
  //user props
  favoriteStations = [],
  userIsFetching,
  fetchUser,
  toggleFavorite,
  nearbyStations = [],

  //schedule props
  scheduleData = {},
  scheduleIsFetching,
  scheduleError,
  fetchSchedule,
  //weather props
  weatherIsFetching,
  forecastLocation,
  isF,
  currentForecast = {},
  hourlyForecast = [],
  weatherError,
  fetchWeather,
}) => {
  if(userIsFetching){
    return <View></View>
  }
  return (
    <Page pageName="OnePage">
      <View style={styles.container}>
        <WeatherModule
          isFetching={weatherIsFetching}
          isF={isF}
          currentForecast={currentForecast}
          weatherError={weatherError}
          fetchWeather={fetchWeather}
          hourlyForecast={hourlyForecast}
          city={forecastLocation}
        />
        <TransitModule
          fetchSchedule={fetchSchedule}
          scheduleData={scheduleData}
          isFetching={scheduleIsFetching || userIsFetching}
          favoriteStations={favoriteStations}
          toggleFavorite={toggleFavorite}
          nearbyStations={nearbyStations}
        />
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#e2e2e2',
  }
})
export default HomeScreen