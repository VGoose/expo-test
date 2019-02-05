import React from 'react'
import { View, Text, StyleSheet, SectionList, Switch } from 'react-native'
import { colors, padding, fonts } from '../styles/base';

class SettingsDetail extends React.Component {
  static navigationOptions = {
    title: 'GENERAL',

  }
  _renderItem = ({ item, section }) =>
    <Option key={`${section}.${item}`} name={item.name} type={item.type} value={item.value} onChange={item.onChange} />


  _renderSectionHeader = ({ section: { title } }) =>
    <Header title={title} key={title} />

  render() {
    const { isCelsius, isNearby, toggleCelsius, toggleNearby } = this.props
    return <View style={styles.container}>
      <SectionList
        keyExtractor={(item, index) => item + index}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        sections={[
          // { title: 'General', data: [{name: 'ime', type: 'switch'}] },
          {
            title: 'Home',
            data:
              [{
                name: 'Show Nearby Stations First',
                type: 'switch',
                value: isNearby,
                onChange: toggleNearby
              }]
          },
          {
            title: 'Weather',
            data:
              [{
                name: 'Display Temp in Celsius',
                type: 'switch',
                value: isCelsius,
                onChange: toggleCelsius
              }]
          },
        ]}
      />
    </View>
  }
}

const Header = ({ title }) => {
  return (<View style={styles.headerContainer} >
    <Text style={styles.headerName}>{title}</Text>
  </View>)
}

const Option = ({ name, type, value, onChange }) => {
  return (<View style={styles.optionContainer}>
    <Text style={styles.optionName}>{name}</Text>
    <Switch value={value} onValueChange={value => onChange(value)} />
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionContainer: {
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingLeft: padding.sm,
    paddingRight: padding.sm,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,

  },
  optionName: {
    fontSize: fonts.md
  },
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    paddingLeft: padding.sm,
  },
  headerName: {
    fontSize: fonts.lg,
    fontWeight: '500',
  },
})

export default SettingsDetail