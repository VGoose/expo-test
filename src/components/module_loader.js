import React from 'react'
import { Animated, View } from 'react-native'

export default class ModuleLoader extends React.PureComponent {
  state = { width: null }
  x = new Animated.Value(0)
  translate = () => {
    Animated.timing(this.x, {
      toValue: this.state.width - 20,
      duration: 500,
    }).start(() => {
      Animated.timing(this.x, {
        toValue: 0,
        duration: 500
      }).start(this.translate)
    })
  }

  onLayout = ({ nativeEvent }) => {
    const { x, y, width, height } = nativeEvent.layout
    this.setState({ width })
  }
  render() {
    this.state.width ? this.translate() : null
    const _style = {
      position: 'relative',
      height: 2,
      width: 20,
      backgroundColor: 'green',
    }
    return (
      <View onLayout={this.onLayout} style={{ width: this.with, height: 2 }}>
        <Animated.View style={[
          _style,
          { transform: [{ translateX: this.x }] }
        ]}
        />
      </View >
    )
  }
}
