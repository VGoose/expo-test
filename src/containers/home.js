import { connect } from 'react-redux'

import HomeScreen from '../components/home_screen'

import { userToggleFavorite, fetchUserIfNeeded } from '../actions/user'
import { fetchScheduleIfNeeded } from '../actions/schedule'
import { fetchWeatherIfNeeded } from '../actions/weather'

const mapStateToProps = (state) => {
  return {
    //meta
    metaConnectionType: state.meta.connectionType,
    metaEffectiveType: state.meta.effectiveType,
    showSpinner: state.meta.showSpinner,
    
    //user
    favoriteStations: state.user.favoriteStations,
    nearbyStations: state.user.nearbyStations,
    userIsFetching: state.user.isFetching,
    userError: state.user.error,
    userLocation: state.user.location,
    isCelsius: state.user.isCelsius,
    isNearby: state.user.isNearby,

    //schedule
    scheduleData: state.schedule.schedule || {},
    scheduleIsFetching: state.schedule.isFetching,
    scheduleError: state.schedule.error,
    scheduleLastUpdated: state.schedule.lastUpdated,

    //weather
    currentForecast: state.weather.currentForecast || [],
    hourlyForecast: state.weather.hourlyForecast || [],
    forecastLocation: state.weather.forecastLocation,
    weatherIsFetching: state.weather.isFetching,
    //TODO give user toggle ability
    weatherError: state.weather.error,
    weatherOfflineState: state.weather.lastState,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleFavorite: id => dispatch(userToggleFavorite(id)),
    fetchUser: () => dispatch(fetchUserIfNeeded()),

    fetchSchedule: () => dispatch(fetchScheduleIfNeeded()),

    fetchWeather: () => dispatch(fetchWeatherIfNeeded()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)