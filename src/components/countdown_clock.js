import React from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight, Animated, Easing } from 'react-native'

import { dimensions, fonts, padding, margin, colors } from '../styles/base'

import Time from './reusable/time';

import STATIONS from '../static/stations.json';

class CountdownClock extends React.Component {

  state = {
    rowOpacity: new Animated.Value(0),
    height: new Animated.Value(50),
    opacity: new Animated.Value(0),
    open: false
  }
  componentDidMount() {
    this.barFadeIn()
  }

  barFadeIn = () => Animated.timing(
    this.state.opacity,
    {
      toValue: 1,
      duration: 300
    }
  ).start()

  barFadeOut = (remove) => Animated.timing(
    this.state.opacity,
    {
      toValue: 0,
      duration: 300
    }
  ).start(({ finished }) => finished ? remove() : null)

  collapse = () => Animated.sequence([
    Animated.timing(
      this.state.rowOpacity,
      {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }
    ),
    Animated.timing(
      this.state.height,
      {
        toValue: 50,
        duration: 250
      }
    )
  ]).start(({ finished }) => finished ? this.toggle() : null)

  open = () => Animated.stagger(200, [
    Animated.timing(
      this.state.height,
      {
        toValue: 140,
        duration: 250
      }
    ),
    Animated.timing(
      this.state.rowOpacity,
      {
        toValue: 1,
        duration: 250,
        easing: Easing.linear
      }
    )
  ]).start(({ finished }) => finished ? this.toggle() : null)

  toggle = () => {
    this.setState({ open: !this.state.open })
  }


  render() {
    const { isNearby, isFav, name, schedules = {}, toggleFavorite, id, fetchSchedule, isFetching, onPressItem } = this.props
    //handle 'stations' that serve no trains
    if (STATIONS[id].trains.length === 0) {
      return null
    }
    const badges = STATIONS[id].trains
      .map(train => <Badge key={train} train={train} />)

    return (
      <Animated.View style={{ ...styles.countdownClock, height: this.state.height, opacity: this.state.opacity }}>
        <Bar
          toggle={() => this.state.open ? this.collapse() : this.open()}
          fadeOut={this.barFadeOut}
          name={name}
          badges={badges}
          isFav={isFav}
          isNearby={isNearby}
          favorite={toggleFavorite ? toggleFavorite : onPressItem} id={id} />
        {this.state.open
          ? <AnimatedRowList animatedOpacity={this.state.rowOpacity}
            schedules={schedules}
            isFetching={isFetching} />
          : null}
      </Animated.View>
    )
  }
}

const Star = ({ isNearby, fadeOut, favorite, id, isFav }) => {
  return (
    isFav
      ? <TouchableHighlight
        underlayColor='transparent'
        activeOpacity={0.0}

        onPress={isNearby
          ? () => favorite(id)
          : () => fadeOut(() => favorite(id))
        }>
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

class AnimatedRowList extends React.Component {
  //TODO add spinner
  render() {
    const { isFetching, schedules } = this.props
    if (isFetching) {
      return <View style={styles.rowContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    }
    return (
      <Time>
        {({ time }) => {
          const _schedules = schedules
            .filter(schedule => new Date(schedule.time) - time > 0)
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .slice(0, 3)
          let rows = _schedules
            .map((schedule, index) => (
              <Row
                animatedOpacity={this.props.animatedOpacity}
                key={schedule.train + schedule.direction + schedule.time + index}
                schedule={schedule}
                index={index}
                time={time}
              />
            ))
          return < View style={styles.rowContainer} >
            {rows}
          </View>
        }}
      </Time>
    )
  }
}
const Row = ({ animatedOpacity, schedule, index, time }) => {
  let seconds = Math.floor((new Date(schedule.time) - time) / 1000);
  let minutes = Math.floor(seconds / 60);
  let countdown = seconds >= 60 ? minutes : seconds > 30 ? seconds : 'now';
  return (

    <Animated.View
      style={{
        ...styles.row,
        opacity: animatedOpacity,
      }}
    >
      <View style={styles.row_left}>

        <Badge isRowBadge train={schedule.train} />
        <Text style={styles.row_headsign}>{schedule.headsign}</Text>
      </View>
      <Text style={styles.row_time}>{countdown} {seconds > 60 ? 'min' : Number.isInteger(seconds) && seconds > 30 ? 'sec' : null}</Text>
    </Animated.View>
  )
}
const Bar = ({ isNearby, fadeOut, toggle, name, badges, isFav, favorite, id, fetchSchedule }) => {
  //fetchSchedule only passed when clock in collapsed state, when closing fetchSchedule will just be 
  //a blank function
  fetchSchedule ? null : fetchSchedule = () => { }
  return <View style={styles.countdownClock_Bar}>
    <TouchableHighlight
      underlayColor={'transparent'}
      activeOpacity={0.5}
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
      <Star isFav={isFav} isNearby={isNearby} fadeOut={fadeOut} favorite={favorite} id={id} />
    </View>
  </View>
  { children }
}
const { fullWidth, fullHeight } = dimensions

const styles = StyleSheet.create({
  countdownClock: {
    backgroundColor: colors.white,
    marginBottom: margin.sm,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey
  },
  countdownClock_Collapsed: {
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: .5,
    shadowRadius: 3,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    marginBottom: margin.xs,

  },
  countdownClock_Bar: {
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
    flex: 5,
    justifyContent: 'center',
    paddingLeft: padding.sm,
  },
  countdownClock_Bar_Name_Text: {
    fontSize: fonts.md
  },
  countdownClock_Bar_Badges: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  countdownClock_Bar_Star: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: padding.sm,
  },
  rowContainer: {
    flex: 1,
    height: 90,
    backgroundColor: colors.lightGrey
  },
  loadingText: {
    textAlign: 'center',
    paddingTop: padding.sm
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
  starImage: {
    maxHeight: 40,
    maxWidth: 40
  }
})
export default CountdownClock;
