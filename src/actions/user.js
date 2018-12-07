"use strict";

import { AsyncStorage } from 'react-native'
import { Location, Permissions } from 'expo'
import STATIONS from '../static/stations.json'
import axios from '../utils/axios'
import { diff, getEuclideanDist } from '../utils/helpers'

import { fetchWeatherIfNeeded } from './weather'

//USERS
export const userTypes = {
	USER_REQUEST: 'USER_REQUEST',
	USER_RECEIVE: 'USER_RECEIVE',
	PERMISSION_REQUEST: 'PERMISSION_REQUEST',
	PERMISSION_RECEIVE: 'PERMISSION_RECEIVE',
	USER_LOCATE: 'USER_LOCATE',
	USER_LOCATED: 'USER_LOCATED',
	USER_ERROR: 'USER_ERROR',
}

export const startUpFetch = () => dispatch => {
	dispatch(locateUser())
		.then(pos => {
			dispatch(userLocated(pos.coords.latitude, pos.coords.longitude))
			dispatch(fetchWeatherIfNeeded())
			dispatch(setNearbyStations(0.5))
			}
		)
		.catch(err => dispatch(locateError(err)))
}
export const askLocationPermission = () => dispatch => {
	Permissions.askAsync(Permissions.LOCATION)
		.then(
			({ status }) => status === 'granted'
				? dispatch(receivePermission(true))
				: dispatch(receivePermission(false))
		)
}

const requestPermission = () => {
	return {
		type: userTypes.PERMISSION_REQUEST
	}
}

const receivePermission = (isGranted) => {
	return {
		type: userTypes.PERMISSION_RECEIVE,
		status: isGranted
	}
}

export const setNearbyStations = (rad) => (dispatch, getState) => {
	const { lat, lon } = getState().user.location
	const stations = getNearbyStations(lat, lon, rad)
	dispatch(userReceive({ nearbyStations: stations }))
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

const userLocated = (lat, lon) => {
	return {
		type: userTypes.USER_LOCATED,
		lat,
		lon
	}
}

const locateError = (error) => {
	return {
		type: userTypes.USER_ERROR,
		error: {
			locationError: error
		}
	}
}
export const locateUser = () => (dispatch, getState) => {
	dispatch(userLocate())
	if (getState().user.isLocationEnabled) {
		dispatch(locateError(new Error('Location services not enabled.')))
	}
	return Location.getCurrentPositionAsync({ enableHighAccuracy: false })
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
		data = {
			favorite_stations: favs.filter(s => s.stop_id !== id)
		}
	} else {
		//add to favorites
		data = {
			favorite_stations: [...getState().user.favoriteStations, stationObj]
		}
	}
	dispatch(userUpdateData(data))
}

export const fetchUserIfNeeded = () => (dispatch, getState) => {
	if (shouldUserFetch(getState())) {
		dispatch(userFetch())
	}
}

const userFetch = () => dispatch => {
	dispatch(userRequest())
	AsyncStorage.multiGet(['favoriteStations'])
		.then(resultsArr => {
			return new Promise(
				(resolve, reject) => {
					let data = {}
					resultsArr.forEach(([k, v]) => {
						//in case v is not json string but plain string
						try {
							data[k] = JSON.parse(v)
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
const userUpdateData = (data) => (dispatch, getState) => {
	if (shouldUserPost(getState())) {
		dispatch(userRequest())
		dispatch(userPostData(data))
	}
}
const userPostData = (data) => dispatch => {
	//TODO: generalize posting data for all type of data
	AsyncStorage.setItem('user.favoriteStations', JSON.stringify(data))
		.then(() => AsyncStorage.getItem('user.favoriteStations'))
		.then(result => dispatch(userReceive(JSON.parse(result))))
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

