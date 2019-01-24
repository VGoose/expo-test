import { AsyncStorage } from 'react-native'
import store from './store'
import { showSpinner, hideSpinner } from './actions/meta'
import { fetchWeatherIfNeeded, getLastWeather } from './actions/weather'
import { fetchScheduleIfNeeded, getLastSchedule } from './actions/schedule'
import { checkConnection } from './actions/meta'
import {
	locateUser,
	userLocated,
	setNearbyStations,
	askLocationPermission,
	fetchUserIfNeeded,
} from './actions/user'

//load offline data from async storage
async function offlineFetch() {
	store.dispatch(getLastSchedule())
	store.dispatch(getLastWeather())
}


export default startUpFetch = () => {
	store.dispatch(checkConnection())
	//to prevent race condition where offline data
	//overwrites freshly fetched data
	offlineFetch()
		.then(
			() => {
				store.dispatch(fetchScheduleIfNeeded())
				store.dispatch(askLocationPermission())
				store.dispatch(fetchUserIfNeeded())
				store.dispatch(locateUser())
					.then(pos => {
						store.dispatch(userLocated(pos.coords.latitude, pos.coords.longitude))
						store.dispatch(fetchWeatherIfNeeded())
						store.dispatch(setNearbyStations(0.5))
					}
					)
					.catch(err => store.dispatch(locateError(err)))
			}
		)
}