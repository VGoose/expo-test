import React from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'

import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons'

import { dimensions, fonts, padding, margin, colors } from '../styles/base'

import Toggle from './reusable/toggle';
import Time from './reusable/time';

import STATIONS from '../static/stations.json';

const CountdownClock = ({ isFav, name, schedules = {}, favorite, id, fetchSchedule, isFetching, onPressItem }) => {
  //handle 'stations' that serve no trains
  if (STATIONS[id].trains.length === 0) {
    return null
  }
  let badges = STATIONS[id].trains
    .map(train => <Badge key={train} train={train} />)
  return (
    <Toggle>
      {({ show, toggle }) => {
        return (
          show
            ? <View style={styles.countdownClock}>
              <Bar toggle={toggle} name={name} badges={badges} isFav={isFav} favorite={favorite ? favorite : onPressItem} id={id} />
              <RowList schedules={schedules} isFetching={isFetching} />
            </View>
            : <View style={styles.countdownClock_Collapsed}>
              <Bar toggle={toggle} fetchSchedule={fetchSchedule} name={name} badges={badges} isFav={isFav} favorite={favorite ? favorite : onPressItem} id={id} />
            </View>
        )
      }}
    </Toggle>
  )
}

const Star = ({ favorite, id, isFav }) => {
  return (
    isFav
      ? <TouchableHighlight
        underlayColor='transparent'
        activeOpacity={0.0}
        onPress={() => favorite(id)}
        style={styles.starred}>
        <Image source={require('../assets/icons/pin_a.png')} />

      </TouchableHighlight>

      : <TouchableHighlight
        underlayColor='transparent'
        activeOpacity={0.0}
        onPress={() => favorite(id)}>
        <Image source={require('../assets/icons/pin.png')} />
      </TouchableHighlight>
  )
}

const Badge = ({ train, isRowBadge }) => {
  let hue;
  switch (train) {
    case '1': case '2': case '3':
      hue = '#EE352E';
      break;
    case '4': case '5': case '6':
      hue = '#00933C';
      break;
    case '7':
      hue = '#B933AD';
      break;
    case 'B': case 'D': case 'F': case 'M':
      hue = '#FF6319';
      break;
    case 'A': case 'C': case 'E':
      hue = '#006699';
      break;
    case 'G':
      hue = '#6CBE45';
      break;
    case 'J': case 'Z':
      hue = '#996633';
      break;
    case 'L':
      hue = '#A7A9AC';
      break;
    case 'N': case 'Q': case 'R': case 'W':
      hue = '#FCCC0A';
      break;
    default: hue = 'black';
  }
  if (isRowBadge) {
    return (
      <View style={{ ...styles.badge__small, backgroundColor: hue }}>
        <Text style={styles.badgeText__small}>{train}</Text>
      </View>
    )
  }
  return (
    <View style={{ ...styles.badge, backgroundColor: hue }}>
      <Text style={styles.badgeText}>{train}</Text>
    </View>
  )
}

const Row = ({ schedule, index }) => {
  return (
    <Time>
      {({ time }) => {
        let seconds = Math.floor((new Date(schedule.time) - time) / 1000);
        let minutes = Math.floor(seconds / 60);
        let countdown = seconds > 60 ? minutes : seconds > 30 ? seconds : 'now';
        return (
          <View
            style={{ ...styles.row, backgroundColor: index % 2 !== 1 ? '#D5D9DA' : '#FFFFFF' }}
          >
            <View style={styles.row_left}>

              <Badge isRowBadge train={schedule.train} />
              <Text style={styles.row_headsign}>{schedule.headsign}</Text>
            </View>
            <Text style={styles.row_time}>{countdown} {seconds > 60 ? 'min' : Number.isInteger(seconds) && seconds > 30 ? 'sec' : null}</Text>
          </View>)
      }}
    </Time>
  )
}
const RowList = ({ schedules, isFetching }) => {
  //TODO add spinner
  if (isFetching) {
    return <View style={styles.rowContainer}>
      <Text>Loading...</Text>
    </View>
  }
  return (
    <Time>
      {({ time }) => {
        let rows = schedules
          .filter(schedule => new Date(schedule.time) - time > 0)
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .map((schedule, index) => (
            <Row key={schedule.train + schedule.direction + schedule.time} schedule={schedule} index={index} />
          ))
        return < View style={styles.rowContainer} >
          {rows.slice(0, 3)}
        </View>
      }}
    </Time>

  )
}
const Bar = ({ toggle, name, badges, isFav, favorite, id, fetchSchedule }) => {
  //fetchSchedule only passed when clock in collapsed state, when closing fetchSchedule will just be 
  //a blank function
  fetchSchedule ? null : fetchSchedule = () => { }
  return <View style={styles.countdownClock_Bar}>
    <TouchableHighlight
      underlayColor={'transparent'}
      activeOpacity={0.0}
      style={styles.countdownClock_Touchable}
      onPress={toggle}>
      <View style={styles.countdownClock_Touchable_Container}>
        <View style={styles.countdownClock_Bar_Name}>
          <Text
            numberOfLines={1}
            style={styles.countdownClock_Bar_Name_Text}
            ellipsizeMode='tail'>
            {name}
          </Text>
        </View>
        <View style={styles.countdownClock_Bar_Badges}>
          {badges}
        </View>
      </View>
    </TouchableHighlight>
    <View style={styles.countdownClock_Bar_Star} >
      <Star isFav={isFav} favorite={favorite} id={id} />
    </View>
  </View>
  { children }
}
const { fullWidth, fullHeight } = dimensions

const styles = StyleSheet.create({
  countdownClock: {
    backgroundColor: colors.white,
    marginBottom: margin.xs,
    borderRadius: 5,
    height: 140,
  },
  countdownClock_Collapsed: {
    backgroundColor: colors.white,

    borderColor: colors.darkGrey,
    marginBottom: margin.xs,

  },
  countdownClock_Bar: {
    // backgroundColor: 'blue',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 50,
  },
  countdownClock_Touchable: {
    flex: 12,
    justifyContent: 'center',
  },
  countdownClock_Touchable_Container: {
    flex: 1,
    flexDirection: 'row'
  },
  countdownClock_Bar_Name: {
    // backgroundColor: 'yellow',
    flex: 5,
    justifyContent: 'center',
    paddingLeft: padding.sm,
  },
  countdownClock_Bar_Name_Text: {
    fontSize: fonts.md
  },
  countdownClock_Bar_Badges: {
    // backgroundColor: 'green',
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  countdownClock_Bar_Star: {
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: padding.sm,
  },
  rowContainer: {
    flex: 1,
    height: 90
  },
  row: {
    flex: 1,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: padding.sm,
    paddingRight: padding.sm
  },
  row_left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  row_headsign: {
    paddingLeft: padding.sm,

  },
  row_time: {

  },
  badge: {
    borderRadius: 11,
    width: 22,
    height: 22,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  badge__small: {
    flex: 0,
    borderRadius: 11,
    width: 22,
    height: 22,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  badgeText: {
    fontSize: fonts.sm,
    color: 'white'
  },
  badgeText__small: {
    fontSize: fonts.sm,
    color: 'white'
  },
  starred: {
    // backgroundColor: 'grey',
    // height: HEIGHT
  },
  starImage: {
    maxHeight: 40,
    maxWidth: 40
  }
})
export default CountdownClock;
