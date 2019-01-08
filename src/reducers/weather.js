import { weatherTypes } from '../actions/weather'

const {
  WEATHER_REQUEST,
  WEATHER_RECEIVE,
  WEATHER_ERROR,
  OFFLINE_SAVE,
  OFFLINE_SAVED,
} = weatherTypes

const initialState = {
  isFetching: false,
  currentForecast: null,
  hourlyForecast: null,
  forecastLocation: '',
  lastUpdated: null,
  isF: true,
  error: null,
  lastState: null,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case OFFLINE_SAVE:
      return {
        ...state,
      }
    case OFFLINE_SAVED:
      return {
        ...state,
        lastState: action.lastState,
      }
    case WEATHER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case WEATHER_RECEIVE:
      return {
        ...state,
        forecastLocation: action.forecastLocation,
        currentForecast: action.currentForecast,
        hourlyForecast: action.hourlyForecast,
        lastUpdated: Date.now(),
        isFetching: false,
      }
    case WEATHER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: {
          ...state.error,
          ...action.error
        }
      }
    default:
      return state
  }
}