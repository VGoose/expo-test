import { combineReducers } from 'redux'

import userReducer from './user'
import scheduleReducer from './schedule'
import weatherReducer from './weather'
import metaReducer from './meta'

export default combineReducers({
    meta: metaReducer,
    user: userReducer,
    schedule: scheduleReducer,
    weather: weatherReducer
})