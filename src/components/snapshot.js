import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { padding, fonts, margin, colors } from '../styles/base'

const WeatherIcon = (iconCode) => {
    let name
    switch (iconCode) {
        case 'clear-day':
        case 'clear-night':
        case 'rain':
        case 'snow':
        case 'sleet':
        case 'wind':
        case 'fog':
        case 'cloudy':
        case 'partly-cloudy-day':
        case 'partly-cloudy-night':
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
const Temp = ({ temp, apTemp }) => {
    return <Text style={styles.tempDescNum}>{`${temp} | ${apTemp}`}</Text>
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
export const Snapshot = ({ time, precipProb, iconCode, temp, isF, apparentTemperature }) => {
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
                <Temp temp={temp} apTemp={apparentTemperature} />
            </View>
        </View>
    )
}
export const CurrentSnapshot = ({ currentForecast, isF }) => {
    const { precipProbability, iconCode, temperature, apparentTemperature, summary } = currentForecast
    const unit = isF ? 'F' : 'C'
    const temp = Math.round(temperature)
    const apTemp = Math.round(apparentTemperature)
    return (
        <View style={styles.currentContainer}>
            <View style={styles.timePrecipContainer}>
                <Text style={styles.timeText}>Now</Text>
                <PrecipProb precipProb={precipProbability} />
            </View>
            <View style={styles.iconContainer}>
                <WeatherIcon iconCode={iconCode} />
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
                    <Text style={styles.tempDescText}>Feels</Text>
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
        fontSize: fonts.sm,
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

