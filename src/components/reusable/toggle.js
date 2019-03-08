import React from 'react'

export default class Toggle extends React.PureComponent {
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