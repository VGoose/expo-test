import store from './store'
import { fetchWeatherIfNeeded } from './actions/weather'
import { fetchScheduleIfNeeded } from './actions/schedule'
import { 
	locateUser, 
	userLocated, 
	setNearbyStations, 
	askLocationPermission, 
	fetchUserIfNeeded 
} from './actions/user'

export default startUpFetch = () => {
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