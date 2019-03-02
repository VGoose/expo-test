"use strict";

import React from 'react'
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Page from './page'
import CountdownClock from './countdown_clock'
import { fonts, padding, colors, margin } from '../styles/base'

import PARENT_STATIONS from '../static/parentStations.json'


export default class TransitScreen extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }
  state = {
    listData: [],
    text: '',
  }

  componentDidMount() {
  }
  _renderItem = ({ item }) => {
    const { isFetching, toggleFavorite } = this.props
    return (
      <CountdownClock
        onPressItem={toggleFavorite}
        isFetching={isFetching}
        name={item.name}
        schedules={item.schedules}
        isFav={this._isFav(item.stop_id)}
        id={item.stop_id}
      />

    )
  }
  _keyExtractor = (item, index) => {
    return item.stop_id
  }
  _isFav = (id) => {
    const { favoriteStations } = this.props
    return favoriteStations.some((station) => id === station.stop_id)
  }
  _onChangeHandler = (searchText) => {
    const { scheduleData } = this.props
    let northSchedule, southSchedule
    const data = PARENT_STATIONS.map(station => {
      northSchedule = station.stop_id + 'N' in scheduleData ? scheduleData[station.stop_id + 'N'] : [];
      southSchedule = station.stop_id + 'S' in scheduleData ? scheduleData[station.stop_id + 'S'] : [];
      return {
        stop_id: station.stop_id,
        name: station.stop_name,
        schedules: [...northSchedule, ...southSchedule]
      }
    })
    this.setState({
      listData: this._filter(searchText, data)
    })
  }
  _filter = (str, data) => {

    return data.filter((station) => station.name.toLowerCase().indexOf(str.toLowerCase()) !== -1)
  }
  render() {
    return (
      <Page pageName="Transit">
        <View style={styles.container} testID="transit-screen">
          <SearchBar inputRef={this.inputRef} changeHandler={this._onChangeHandler} />
          <View style={styles.listContainer}>
            <FlatList
              onRefresh={this.props.fetchSchedule}
              refreshing={this.props.scheduleIsFetching}
              data={this.state.listData}
              extraData={this.props.favoriteStations}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              removeClippedSubviews={false}
            />
          </View>
        </View>
      </Page>
    )
  }
}



const SearchBar = ({ inputRef, changeHandler }) => {
  //simple filter that returns arr of matches 

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.greyContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name='ios-search' size={25} />
        </View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onChangeText={changeHandler}
          placeholder='Search Stations By Name'
          autoFocus
          allowFontScaling
          spellCheck={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    height: 60,
    display: 'flex',
    marginTop: margin.sm,
    marginBottom: margin.sm,
    // borderBottomColor: colors.darkGrey,
    // borderBottomWidth: 0.5
  },
  greyContainer: {
    backgroundColor: colors.grey,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    height: 40,
    marginLeft: margin.md,
    marginRight: margin.md
  },
  iconContainer: {
    marginLeft: margin.md
  },
  input: {
    flex: 1,
    padding: padding.xs,
    height: 40,
    marginLeft: margin.md,
    marginRight: margin.md,

    // paddingLeft: padding.md,
    fontSize: fonts.md,
  },
  listContainer: {
    margin: margin.md,
    marginTop: 0,
    flex: 1,
  },
})
