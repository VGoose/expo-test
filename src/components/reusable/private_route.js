import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

//destructure and reassign component to Component because need to capitalize component 
const PrivateRoute = ({ component: Component, ...rest, isAuth, userFetching }) => (
	userFetching 
	? 'Loading...'  //TODO
	: <Route {...rest} render={(props) => (
		isAuth
		  ? <Component {...props} />
		  : <Redirect to='/login' />
	 )} />
)

function mapStateToProps(state) {
	return {
		isAuth: state.user.isAuth,
		userFetching: state.user.loading,
	}
}

export default connect(
	mapStateToProps,
	null,
)(PrivateRoute);
