import axios from '../utils/axios'
import { AsyncStorage } from 'react-native'

export const SCHEDULE_REQUEST = 'SCHEDULE_REQUEST'
export const SCHEDULE_RECEIVE = 'SCHEDULE_RECEIVE'
export const SCHEDULE_ERROR = 'SCHEDULE_ERROR'
export const OFFLINE_SAVE = 'SCHEDULE_OFFLINE_SAVE'
export const OFFLINE_SAVED = 'SCHEDULE_OFFLINE_SAVED'

export const getLastSchedule = () => dispatch => {
	return AsyncStorage.getItem('scheduleLastState')
		.then(state => {
			dispatch(offlineSaved(state))
			dispatch(scheduleReceive(JSON.parse(state)))
		})
}
const offlineSave = () => {
	return {
		type: OFFLINE_SAVE
	}
}

const offlineSaved = (result) => {
	return {
		type: OFFLINE_SAVED,
		lastState: JSON.parse(result)
	}
}
const offlineSaveError = (error) => {
	return {
		type: SCHEDULE_ERROR,
		error: {
			offlineSaveError: error
		}
	}
}

const saveScheduleState = (state) => dispatch => {
	dispatch(offlineSave())
	AsyncStorage.setItem('scheduleLastState', JSON.stringify(state))
		.then(() => AsyncStorage.getItem('scheduleLastState'))
		.then(result => dispatch(offlineSaved(result)))
		.catch(error => dispatch(offlineSaveError(error)))
}
const scheduleRequest = () => {
	return {
		type: SCHEDULE_REQUEST
	}
}

const scheduleReceive = (data) => {
	return {
		type: SCHEDULE_RECEIVE,
		lastUpdated: Date.now(),
		schedule: data.schedules
	}
}
const scheduleDeny = (err) => {
	return {
		type: SCHEDULE_ERROR,
		error: {
			networkError: err
		}
	}
}
const scheduleFetch = () => (dispatch, getState) => {
	dispatch(scheduleRequest())
	return axios.get(`/schedule`)
		.then(
			res => {
				dispatch(scheduleReceive(res.data))
				dispatch(saveScheduleState(res.data))
			},
			err => dispatch(scheduleDeny(err))
		)
}

const shouldScheduleFetch = (state) => {
	//convert from string to
	const msSinceLastUpdate = Date.now() - state.schedule.lastUpdated
	if (msSinceLastUpdate < 30000 || state.schedule.isFetching) {
		return false
	} if (state.user.favoriteStations) {
		return true
	}
	return true
}

export const fetchScheduleIfNeeded = () => (dispatch, getState) => {
	return shouldScheduleFetch(getState())
		? dispatch(scheduleFetch())
		: null
}