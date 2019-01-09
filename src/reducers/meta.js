import {
  CONNECTION_GET,
  CONNECTION_RECEIVE,
} from '../actions/meta'

const initialState = {
  isFetching: false,
  connectionType: null,
  effectiveType: null
}

export default function (state = initialState, action) {
  switch (action.type) {
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