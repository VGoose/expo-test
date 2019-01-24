"use strict";

import React from 'react'
import { Text, View, StyleSheet, Image, TouchableHighlight, Linking } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { colors, fonts, padding, margin } from '../styles/base'

import Page from './page'
import AboutDetail from './about_detail'
import Setting from '../containers/setting'
import Bio from './bio'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      // height: 0
    }
  }
  render() {
    
    return (

      <View style={styles.container}>
        <Bio />
        <SettingItem handlePress={() => this.props.navigation.navigate('SettingsDetail')} icon={require('../assets/icons/settings.png')} name="General" nav />
        <SettingItem handlePress={() => this.props.navigation.navigate('AboutDetail')} icon={require('../assets/icons/info.png')} name="About" nav />
        <SettingItem handlePress={() => Linking.openURL('itms-apps://itunes.apple.com/app/id{appStoreId}?action=write-review')} icon={require('../assets/icons/rate.png')} name="Rate" />
        <SettingItem handlePress={() => Linking.openURL('mailto:anhvouw@gmail.com?subject=gogonow_feedback')} icon={require('../assets/icons/mail.png')} name="Contact" />
      </View>
    )
  }
}



const SettingItem = ({ name, icon, nav, handlePress }) => {
  return <TouchableHighlight onPress={handlePress}>
    <View style={styles.itemContainer}>

      <Image style={styles.itemImage} source={icon} />
      <View style={styles.itemName}>
        <Text style={styles.itemNameText}>{name}</Text>
      </View>
      {nav
        ? <View style={styles.itemArrow}>
          <Image source={require('../assets/icons/arrow.png')} />
        </View>
        : null
      }
    </View>
  </TouchableHighlight>
}



const SettingsNavigator = createStackNavigator({
  Settings: {
    screen: SettingsScreen
  },
  SettingsDetail: {
    screen: Setting
  },
  AboutDetail: {
    screen: AboutDetail
  }
},
  {
    initialRouteName: "Settings",

  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // borderTopColor: colors.darkGrey,
    // borderTopWidth: 0.5,
    backgroundColor: colors.grey,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: colors.white,
    paddingLeft: padding.sm,
    paddingRight: padding.sm,
  },
  itemImage: {
    // borderRadius: 5,
    marginRight: margin.lg,
  },
  itemName: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
    flex: 10,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemArrow: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
  },
  itemArrowText: {
    color: colors.darkGrey,
  },
  itemNameText: {
    fontSize: fonts.md
  },
  itemNameTextName: {
    fontSize: fonts.sm,
  }
})
export default SettingsNavigator
// export default SettingsScreen