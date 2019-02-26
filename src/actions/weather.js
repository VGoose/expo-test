import axios from '../utils/axios'
import { AsyncStorage } from 'react-native'

import { locateUserIfNeeded } from './user'

export const weatherTypes = {
  WEATHER_REQUEST: 'WEATHER_REQUEST',
  WEATHER_RECEIVE: 'WEATHER_RECEIVE',
  WEATHER_ERROR: 'WEATHER_ERROR',
  OFFLINE_SAVE: 'WEATHER_OFFLINE_SAVE',
  OFFLINE_SAVED: 'WEATHER_OFFLINE_SAVED',
}

export const getLastWeather = () => dispatch => {
  return AsyncStorage.getItem('weatherLastState')
    .then(state => {
      dispatch(offlineSaved(state))
      dispatch(weatherReceive(JSON.parse(state)))
    })
}
const offlineSave = () => {
  return {
    type: weatherTypes.OFFLINE_SAVE
  }
}

const offlineSaved = (result) => {
  return {
    type: weatherTypes.OFFLINE_SAVED,
    lastState: JSON.parse(result)
  }
}

const offlineSaveError = (error) => {
  return {
    type: weatherTypes.WEATHER_ERROR,
    error: {
      offlineSaveError: error
    }
  }
}

const saveWeatherState = (state) => dispatch => {
  dispatch(offlineSave())
  AsyncStorage.setItem('weatherLastState', JSON.stringify(state))
    .then(() => AsyncStorage.getItem('weatherLastState'))
    .then(result => dispatch(offlineSaved(result)))
    .catch(error => dispatch(offlineSaveError(error)))
}
export const fetchWeatherIfNeeded = () => (dispatch, getState) => {
  if (shouldWeatherFetch(getState())) {
    return dispatch(locateUserIfNeeded())
      .then(loc => {
        return dispatch(getWeather(loc.lat, loc.lon))
      })
      .catch()
  }
}
const shouldWeatherFetch = (state) => {
  const secondsSinceLastUpdate = (lastUpdated - Date.now()) * 1000
  const { isFetching, lastUpdated } = state.weather

  if (isFetching || secondsSinceLastUpdate < 30) {
    return false
  } else {
    return true
  }
}
const getWeather = (lat, lon) => (dispatch) => {
  dispatch(weatherRequest())
  const url = `/weather/${lat}/${lon}`
  return axios.get(url)
    .then(
      res => {
        dispatch(weatherReceive(res.data))
        dispatch(saveWeatherState(res.data))
      },
      err => dispatch(weatherError(err))
    )
}
const weatherRequest = () => {
  return {
    type: weatherTypes.WEATHER_REQUEST
  }
}
const weatherReceive = (data) => {
  const { city, weather: { currently, hourly } } = data
  return {
    type: weatherTypes.WEATHER_RECEIVE,
    forecastLocation: city,
    currentForecast: currently,
    hourlyForecast: hourly.data
  }
}

const weatherError = (error) => {
  return {
    type: weatherTypes.WEATHER_ERROR,
    error: {
      networkError: error
    }
  }
}