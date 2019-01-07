import React from 'react'
import { View } from 'react-native'

export default class Toggle extends React.Component {
  state = {
    show: false,
  }

  toggle = () => {
    this.setState((prevState) => {
      return { show: !prevState.show }
    })
  }

  render() {
    const { children } = this.props;
    const { show } = this.state
    const { toggle } = this;
    return (
     children({ show, toggle }) 
    )
  }
}