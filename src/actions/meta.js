import { NetInfo } from 'react-native'

export const metaTypes = {
  CONNECTION_GET: 'CONNECTION_GET',
  CONNECTION_RECEIVE: 'CONNECTION_RECEIVE',
  START_UP_DONE: 'START_UP_DONE'
}


export const hideSpinner = () => {
  return {
    type: metaTypes.START_UP_DONE
  }
}

//check connection
export const checkConnection = async () => dispatch => {
  dispatch(getConnection())
	NetInfo.getConnectionInfo()
		.then(info => dispatch(receiveConnection(info)))
}

const receiveConnection = (info) => {
  return {
    type: metaTypes.CONNECTION_RECEIVE,
    connectionType: info.type,
    effectiveType: info.effectiveType
  }
}

const getConnection = () => {
  return {
    type: metaTypes.CONNECTION_GET
  }
}


