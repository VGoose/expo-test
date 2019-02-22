import store from './store'
import { fetchWeatherIfNeeded, getLastWeather } from './actions/weather'
import { fetchScheduleIfNeeded, getLastSchedule } from './actions/schedule'
import { checkConnection, hideSpinner } from './actions/meta'
import {
	locateUserIfNeeded,
	locateError,
	setNearbyStations,
	askLocationPermission,
	fetchUserIfNeeded,
} from './actions/user'

//load offline data from async storage
function offlineFetch() {
	return Promise.all([
		store.dispatch(getLastSchedule()),
		store.dispatch(getLastWeather())
	])
}

function fetchData() {
	return Promise.all([
		store.dispatch(fetchScheduleIfNeeded()),
		store.dispatch(askLocationPermission()),
		store.dispatch(fetchUserIfNeeded()),
		store.dispatch(locateUserIfNeeded())
			.then(() => Promise.all([
				store.dispatch(setNearbyStations(0.5)),
				store.dispatch(fetchWeatherIfNeeded())
			]))
			.catch(err => store.dispatch(locateError(err)))
	])
}
export default startUpFetch = () => {
	checkConnection()
		.then(() => {
			if (store.getState().connectionType === 'none') {
				return offlineFetch()
			} else {
				return fetchData()
			}
		})
		.then(() => store.dispatch(hideSpinner()))
		.catch(error => store.dispatch(hideSpinner()))
}