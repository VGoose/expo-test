import { NetInfo } from 'react-native'

const metaTypes = {
  CONNECTION_GET: 'CONNECTION_GET',
  CONNECTION_RECEIVE: 'CONNECTION_RECEIVE',
}
//check connection
export const checkConnection = () => dispatch => {
	NetInfo.getConnectionInfo()
		.then(info => dispatch(receiveConnection(info)))
}

const receiveConnection = (info) => {
  return {
    type: CONNECTION_RECEIVE,
    connectionType: info.type,
    effectiveType: info.effectiveType
  }
}

const getConnection = () => {
  return {
    type: CONNECTION_GET
  }
}


