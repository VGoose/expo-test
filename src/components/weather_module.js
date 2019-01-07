import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

import { Snapshot, CurrentSnapshot } from './snapshot'
import { padding, margin, fonts, colors } from '../styles/base'

const WeatherModule = ({ isFetching, weatherError, ...rest }) => {
    return (
        weatherError
            ? <View style={styles.container}>
                <Bar />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>We're having network issues.  Please try again later.</Text>
                </View>
            </View>
            : isFetching
                ? <View style={styles.container}><Bar /></View>
                : <View style={styles.container}>
                    <Bar />
                    <SnapshotList data={rest} />
                </View>
    )
}

const SnapshotList = ({ data }) => {
    const { hourlyForecast, isF, currentForecast } = data
    let time, temp, apparentTemperature
    const hourlySnaps = hourlyForecast.map(f => {
        time = new Date(f.time * 1000) //TODO convert to hour
        temp = Math.round(f.temperature)
        apparentTemperature = Math.round(f.apparentTemperature)
        return <Snapshot
            key={time}
            time={time}
            precipProb={f.precipProbability}
            iconCode={f.icon}
            temp={temp}
            apparentTemperature={apparentTemperature}
            isF={isF}
        />
    })
    const currentSnap = <CurrentSnapshot
        key={'now'}
        currentForecast={currentForecast}
    />

    return (
        <View style={styles.snapshotListBorderRadiusFix}>
            <ScrollView horizontal contentContainerStyle={styles.snapshotListContainer}>
                {[currentSnap, ...hourlySnaps]}
            </ScrollView>
        </View>
    )
}
const Bar = () => {
    return (
        <View style={styles.barContainer}>
            <Text style={styles.barText}>Powered By Dark Sky</Text>
        </View>
    )
}





const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 180,
        margin: margin.sm,
        borderRadius: 5,
        padding: padding.sm
    },
    barContainer: {
        // backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 30,
        padding: padding.xs,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    barText: {

    },
    snapshotListBorderRadiusFix: {
        borderRadius: 5,
        backgroundColor: colors.grey
    },
    snapshotListContainer: {
        // backgroundColor: colors.grey,
        // borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
    },
    currentSnapshotContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    CurrentSnapshotTempText: {

    },
    CurrentSnapshotSummText: {

    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: colors.grey,
        padding: padding.sm
    },
    errorText: {
        fontSize: fonts.md
    }
})
export default WeatherModule