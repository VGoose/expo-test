import {
	SCHEDULE_REQUEST,
	SCHEDULE_RECEIVE,
	SCHEDULE_ERROR,
	OFFLINE_SAVE,
	OFFLINE_SAVED
} from '../actions/schedule'

const initialState = {
	isFetching: false,
	schedule: null,
	lastUpdated: null,
	error: null,
	lastState: null
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
		case SCHEDULE_REQUEST:
			return {
				...state,
				isFetching: true
			}
		case SCHEDULE_RECEIVE:
			return {
				...state,
				schedule: action.schedule,
				lastUpdated: new Date(action.lastUpdated),
				error: null,
				isFetching: false
			}
		case SCHEDULE_ERROR:
			return {
				...state,
				isFetching: false,
				error: {
					...state.error,
					...action.error
				}
			}
		default:
			return state;
	}
}