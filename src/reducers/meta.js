import { metaTypes } from '../actions/meta'

const {
  CONNECTION_GET,
  CONNECTION_RECEIVE,
  START_UP_DONE,
} = metaTypes

const initialState = {
  isFetching: false,
  connectionType: null,
  effectiveType: null,
  showSpinner: true,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case START_UP_DONE: {
      return {
        ...state,
        showSpinner: false,
      }
    }
    case CONNECTION_GET:
      return {
        ...state,
        isFetching: true
      }
    case CONNECTION_RECEIVE:
      return {
        ...state,
        isFetching: false,
        connectionType: action.connectionType,
        effectiveType: action.effectiveType
      }
    default:
      return state
  }
}