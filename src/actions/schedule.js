import axios from '../utils/axios'

export const SCHEDULE_REQUEST = 'SCHEDULE_REQUEST'
export const SCHEDULE_RECEIVE = 'SCHEDULE_RECEIVE'
export const SCHEDULE_DENY = 'SCHEDULE_DENY'

const scheduleRequest = () => {
    return {
        type: SCHEDULE_REQUEST
    }
}

const scheduleReceive = (data) => {
    return {
        type: SCHEDULE_RECEIVE,
        lastUpdated: data.time,
        schedule: data.schedules
    }
}
const scheduleDeny = (err) => {
    return {
        type: SCHEDULE_DENY,
        err
    }
}
const scheduleFetch = () => (dispatch, getState) => {
    dispatch(scheduleRequest())
    axios.get(`/api/schedule/`)
        .then(
            res => dispatch(scheduleReceive(res.data)),
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
    console.log('if needed')
    shouldScheduleFetch(getState())
        ? console.log('yes') || dispatch(scheduleFetch())
        : console.log('no') || null
}