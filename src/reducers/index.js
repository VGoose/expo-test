import { combineReducers } from 'redux'

import userReducer from './user'
import scheduleReducer from './schedule'
import weatherReducer from './weather'

export default combineReducers({
    user: userReducer,
    schedule: scheduleReducer,
    weather: weatherReducer
})