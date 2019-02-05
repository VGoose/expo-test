import { userTypes } from '../actions/user'
const {
    USER_REQUEST,
    USER_RECEIVE,
    PERMISSION_RECEIVE,
    USER_ERROR,
    USER_LOCATE,
    USER_LOCATED,
    SETTING_CELSIUS,
    SETTING_NEARBY,
} = userTypes

const initialState = {
    isAskingPermission: false,
    location: null,
    isLocating: false,
    nearbyStations: [],
    error: null,
    isFetching: false,
    favoriteStations: [],
    isLocationEnabled: null,
    isCelsius: false,
    isNearby: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SETTING_CELSIUS:
            return {
                ...state,
                isCelsius: action.setting
            }
        case SETTING_NEARBY:
            return {
                ...state,
                isNearby: action.setting
            }
        case PERMISSION_RECEIVE:
            return {
                ...state,
                isLocationEnabled: action.status
            }
        case USER_LOCATE:
            return {
                ...state,
                isLocating: true
            }
        case USER_LOCATED:
            return {
                ...state,
                isLocating: false,
                location: {
                    lat: action.lat,
                    lon: action.lon,
                }
            }
        case USER_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    ...action.error
                }
            }
        case USER_REQUEST:
            return {
                ...state,
                userIsFetching: true
            }
        case USER_RECEIVE:
            return {
                ...state,
                ...action.data,
                userIsFetching: false,
            }
        default:
            return state;
    }
}