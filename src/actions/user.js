"use strict";

import { AsyncStorage } from 'react-native'
import { Location, Permissions } from 'expo'
import STATIONS from '../static/stations.json'
import { diff, getEuclideanDist } from '../utils/helpers'

//USERS
export const userTypes = {
	USER_REQUEST: 'USER_REQUEST',
	USER_RECEIVE: 'USER_RECEIVE',
	PERMISSION_REQUEST: 'PERMISSION_REQUEST',
	PERMISSION_RECEIVE: 'PERMISSION_RECEIVE',
	USER_LOCATE: 'USER_LOCATE',
	USER_LOCATED: 'USER_LOCATED',
	USER_ERROR: 'USER_ERROR',
	OFFLINE_SAVE: 'OFFLINE_SAVE',
	OFFLINE_SAVED: 'OFFLINE_SAVED',
	SETTING_CELSIUS: 'SETTING_CELSIUS',
	SETTING_NEARBY: 'SETTING_NEARBY',
}

export const toggleCelsius = (setting) => dispatch => {
	dispatch(userUpdateData('isCelsius', JSON.stringify(setting)))
}
export const toggleNearby = (setting) => dispatch => {
	dispatch(userUpdateData('isNearby', JSON.stringify(setting)))
}
const offlineSave = () => {
	return {
		type: userTypes.OFFLINE_SAVE
	}
}

const offlineSaved = (result) => {
	return {
		type: userTypes.OFFLINE_SAVED,
		lastState: result
	}
}

const offlineSaveError = (error) => {
	return {
		type: userTypes.USER_ERROR,
		error: {
			offlineSaveErrorUser: error
		}
	}
}

export const saveUserState = (state) => dispatch => {
	dispatch(offlineSave())
	AsyncStorage.setItem('userLastState', JSON.stringify(state))
		.then(() => AsyncStorage.getItem('userLastState'))
		.then(result => dispatch(offlineSaved(result)))
		.catch(error => dispatch(offlineSaveError(error)))
}

export const askLocationPermission = () => dispatch => {
	return Permissions.askAsync(Permissions.LOCATION)
		.then(
			({ status }) => status === 'granted'
				? dispatch(receivePermission(true))
				: dispatch(receivePermission(false))
		)
}


const receivePermission = (isGranted) => {
	return {
		type: userTypes.PERMISSION_RECEIVE,
		status: isGranted
	}
}

export const setNearbyStations = (rad) => (dispatch, getState) => {
	return dispatch(locateUserIfNeeded())
		.then(loc => {
			const stations = getNearbyStations(loc.lat, loc.lon, rad)
			dispatch(userReceive({ nearbyStations: stations }))
		})
		.catch()
}

const getNearbyStations = (lat, lon, rad) => {
	let x, y, dist
	const dists = new Set()
	let _stations = []
	for (let key in STATIONS) {
		let stopLat = parseFloat(STATIONS[key].stop_lat)
		let stopLon = parseFloat(STATIONS[key].stop_lon)
		//constants are rough estimates of miles per degree of lat/lon for NYC
		x = diff(lat, stopLat) * 69.05
		y = diff(lon, stopLon) * 52.35
		dist = getEuclideanDist(x, y)
		//removing N/S stations, same info as parent station
		if (dist < rad
			&& key.split('').slice(-1)[0] !== 'N'
			&& key.split('').slice(-1)[0] !== 'S') {

			STATIONS[key].dist = dist
			_stations.push(STATIONS[key])
			dists.add(dist)
		}
	}
	_stations.sort((a, b) => {
		return a.dist - b.dist;
	})
	return _stations
}
const userLocate = () => {
	return {
		type: userTypes.USER_LOCATE
	}
}

export const userLocated = (lat, lon) => {


	return {
		type: userTypes.USER_LOCATED,
		lat,
		lon,
	}
}

//located -> userLocated() & clear Error
//not located -> locateError

export const locateError = (error) => dispatch => {
	if (error === null) {
		return {
			type: userTypes.USER_ERROR,
			error: {
				locateError: null
			}
		}
	}
	return {
		type: userTypes.USER_ERROR,
		error: {
			locationError: error
		}
	}
}
export const locateUserIfNeeded = () => (dispatch, getState) => {
	const loc = getState().user.location
	const lastLocationUpdated = getState().user.locationTime
	//handle when user manually enable location & update location if >5 min since last locate 
	if (!loc || (Date.now() - lastLocationUpdated) > 1000 * 60 * 5) {
		dispatch(userLocate())
		return Location.getCurrentPositionAsync({ enableHighAccuracy: true })
			.then(pos => {
				dispatch(locateError(null))
				dispatch(userLocated(pos.coords.latitude, pos.coords.longitude))
				return Promise.resolve(getState().user.location)
			})
			.catch(error => {
				dispatch(locateError(error))
				return Promise.reject()
			})
	} else {
		return Promise.resolve(loc)
	}
}

const userRequest = () => {
	return {
		type: userTypes.USER_REQUEST,
	}
}

const userReceive = (data) => {
	return {
		type: userTypes.USER_RECEIVE,
		data
	}
}

const userDenied = (error) => {
	return {
		type: userTypes.USER_ERROR,
		error: {
			fetchError: error
		}
	}
}


export const userToggleFavorite = (id) => (dispatch, getState) => {
	const stationObj = STATIONS[id]
	const favs = getState().user.favoriteStations
	let data
	if (favs.some(s => s.stop_id === id)) {
		//remove from favorites
		data = favs.filter(s => s.stop_id !== id)
	} else {
		//add to favorites
		data = [...getState().user.favoriteStations, stationObj]
	}
	dispatch(userUpdateData('favoriteStations', data))
}

export const fetchUserIfNeeded = () => (dispatch, getState) => {
	if (shouldUserFetch(getState())) {
		return dispatch(userFetch())
	}
}

const userFetch = () => dispatch => {
	dispatch(userRequest())
	return AsyncStorage.multiGet(['favoriteStations', 'isCelsius', 'isNearby'])
		.then(resultsArr => {
			return new Promise(
				(resolve, reject) => {
					let data = {}
					resultsArr.forEach(([k, v]) => {
						if (v === null) {
							return
						}
						//in case v is not json string but plain string
						try {
							let _v = JSON.parse(v)
							//parsing boolean string
							if (_v === 'false' || _v === 'true') {
								_v = _v === 'true'
							}
							data[k] = _v
						} catch {
							data[k] = v
						}
					})
					resolve(data)
				})
		})
		.then(data => dispatch(userReceive(data)))
		.catch(err => dispatch(userDenied(err)))
}
const userUpdateData = (key, data) => (dispatch, getState) => {
	if (shouldUserPost(getState())) {
		dispatch(userRequest())
		dispatch(userPostData(key, data))
	}
}
const userPostData = (key, data) => dispatch => {
	AsyncStorage.setItem(key, JSON.stringify(data))
		.then(() => AsyncStorage.getItem(key))
		.then(result => {
			let _result = JSON.parse(result)
			if (_result === 'false' || _result === 'true') {
				_result = _result === 'true'
			}
			dispatch(userReceive({ [key]: _result }))
		})
		.catch(error => dispatch(userDenied()))
}

const shouldUserFetch = (state) => {
	const userIsFetching = state.user.userIsFetching
	if (userIsFetching) {
		return false
	}
	return true
}

const shouldUserPost = (state) => {
	const userIsFetching = state.user.userIsFetching
	if (userIsFetching) {
		return false
	}
	return true
}

