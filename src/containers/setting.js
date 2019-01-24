import { connect } from 'react-redux'

import SettingDetail from '../components/setting_detail'

import { toggleCelsius, toggleNearby } from '../actions/user'

const mapStateToProps = (state) => {
  return {
    //user
    isCelsius: state.user.isCelsius,
    isNearby: state.user.isNearby,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleCelsius: setting => dispatch(toggleCelsius(setting)),
    toggleNearby: setting => dispatch(toggleNearby(setting)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingDetail)