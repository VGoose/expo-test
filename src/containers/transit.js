import { connect } from 'react-redux'

import TransitScreen from '../components/transit_screen'

import { userToggleFavorite, fetchUserIfNeeded } from '../actions/user'
import { fetchScheduleIfNeeded } from '../actions/schedule'

const mapStateToProps = (state) => {
  return {
    favoriteStations: state.user.favoriteStations,
    nearbyStations: state.user.nearbyStations,
    userIsFetching: state.user.isFetching,
    userError: state.user.error,

    scheduleData: state.schedule.schedule || {},
    scheduleIsFetching: state.schedule.isFetching,
    scheduleError: state.schedule.error,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleFavorite: id => dispatch(userToggleFavorite(id)),
    fetchUser: () => dispatch(fetchUserIfNeeded()),

    fetchSchedule: () => dispatch(fetchScheduleIfNeeded()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransitScreen)