import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import { padding, fonts, margin, colors } from '../styles/base'

const WeatherIcon = (iconCode) => {
    let icon
    switch (iconCode.iconCode) {
        case 'clear-day':
            icon = <Image source={require('../assets/icons/sun.png')} />
            break
        case 'clear-night':
            icon = <Image source={require('../assets/icons/night.png')} />
            break
        case 'rain':
            icon = <Image source={require('../assets/icons/rain.png')} />
            break
        case 'snow':
            icon = <Image source={require('../assets/icons/snow.png')} />
            break
        case 'sleet':
            icon = <Image source={require('../assets/icons/sleet.png')} />
            break
        case 'wind':
            icon = <Image source={require('../assets/icons/wind.png')} />
            break
        case 'fog':
            icon = <Image source={require('../assets/icons/fog.png')} />
            break
        case 'cloudy':
            icon = <Image source={require('../assets/icons/cloud.png')} />
            break
        case 'partly-cloudy-day':
            icon = <Image source={require('../assets/icons/partly_cloudy.png')} />
            break
        case 'partly-cloudy-night':
            icon = <Image source={require('../assets/icons/cloudy_night.png')} />
            break
        default: icon = 'TODO'
    }
    return <Text>{icon}</Text>
}
const PrecipProb = ({ precipProb }) => {
    if (precipProb === 0) {
        return null
    } else {
        return (
            <Text style={styles.precipText}>{`${Math.round(precipProb * 100)} %`}</Text>
        )
    }
}
const Temp = ({ temp, apTemp, isCelsius }) => {
    const _temp = isCelsius ? Math.round((temp - 32) * 5 / 9) : Math.round(temp)
    const _apTemp = isCelsius ? Math.round((apTemp - 32) * 5 / 9) : Math.round(apTemp)
    return <Text style={styles.tempDescNum}>{`${_temp}   ${_apTemp}`}</Text>
}
const Time = ({ time }) => {
    const hour = time.getHours()
    let disp
    if (hour > 12) {
        disp = `${hour - 12} PM`
    } else if (hour === 0) {
        disp = '12 AM'
    } else if (hour === 12) {
        disp = '12 PM'
    } else {
        disp = `${hour} AM`
    }
    return <Text style={styles.timeText}>{disp}</Text>
}
export const Snapshot = ({ time, precipProb, iconCode, temp, isCelsius, apparentTemperature }) => {
    return (
        <View style={styles.hourlyContainer}>
            <View style={styles.timePrecipContainer}>
                <Time time={time} />

                <PrecipProb precipProb={precipProb} />

            </View>
            <View style={styles.iconContainer}>
                <WeatherIcon iconCode={iconCode} />
            </View>
            <View style={styles.tempContainer}>
                <Temp temp={temp} isCelsius={isCelsius} apTemp={apparentTemperature} />
            </View>
        </View>
    )
}
export const CurrentSnapshot = ({ currentForecast, isCelsius }) => {
    const { precipProbability, icon, temperature, apparentTemperature, summary } = currentForecast
    const unit = isCelsius ? 'C' : 'F'
    const temp = isCelsius ? Math.round((temperature - 32) * 5 / 9) : Math.round(temperature)
    const apTemp = isCelsius ? Math.round((apparentTemperature - 32) * 5 / 9) : Math.round(apparentTemperature)
    console.log('current snap: ' + icon)
    return (
        <View style={styles.currentContainer}>
            <View style={styles.timePrecipContainer}>
                <Text style={styles.timeText}>Now</Text>
                <PrecipProb precipProb={precipProbability} />
            </View>
            <View style={styles.iconContainer}>
                <WeatherIcon iconCode={icon} />
            </View>
            <View style={styles.tempContainer}>
                <View style={styles.tempDescContainer}>
                    <View style={styles.tempNumContainer}>
                        <Text style={styles.tempDescNum}>{`${temp}`}</Text>
                        <Text style={styles.tempDescUnit}>{`${unit}`}</Text>
                    </View>
                    <Text style={styles.tempDescText}>Temp</Text>
                </View>
                <View style={styles.tempDescContainer}>
                    <View style={styles.tempNumContainer}>
                        <Text style={styles.tempDescNum}>{`${apTemp}`}</Text>
                        <Text style={styles.tempDescUnit}>{`${unit}`}</Text>
                    </View>
                    <Text style={styles.tempDescText}>Feels Like</Text>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    hourlyContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: padding.sm,
        paddingBottom: padding.xs,
        alignItems: 'center',
    },
    currentContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: padding.sm,
        paddingBottom: padding.xs,
        alignItems: 'center',
        width: 120,
    },
    timePrecipContainer: {
        flex: 2,
        flexShrink: 0,
        justifyContent: 'flex-start',
    },
    timeText: {
        textAlign: 'center',
        fontSize: fonts.md,
    },
    precipText: {
        fontSize: fonts.xs,
        textAlign: 'center'
    },
    iconContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tempContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    tempDescContainer: {
        flex: 5,
        alignContent: 'center',
        justifyContent: 'center',
    },
    tempDescText: {
        fontSize: fonts.xs,
        textAlign: 'center'
    },
    tempNumContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    tempDescNum: {
        fontSize: fonts.md,
        textAlign: 'center'
    },
    tempDescUnit: {
        fontSize: fonts.md,
    },
    tempTextDeg: {
        fontSize: fonts.md
    }
})

