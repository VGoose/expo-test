import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

import { Snapshot, CurrentSnapshot } from './snapshot'
import { padding, margin, fonts, colors } from '../styles/base'

const WeatherModule = ({ isFetching, weatherError, city, currentForecast, hourlyForecast, isCelsius }) => {
	const _hourlyForecast = hourlyForecast.filter(f => (f.time * 1000) > Date.now())

	return (
		weatherError && _hourlyForecast.length === 0
			? <View style={styles.container}>
				<Bar city={city} />
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>We're having network issues.  Please try again later.</Text>
				</View>
			</View>
			: _hourlyForecast.length === 0
				? <View style={styles.container}>
					<Bar />
					<Text style={styles.noDataText}>
						No weather data currently available.
						</Text>
				</View>
				: <View style={styles.container}>
					<Bar city={city} />
					<SnapshotList
						hourly={_hourlyForecast}
						isCelsius={isCelsius}
						current={currentForecast}
					/>
				</View>
	)
}

const SnapshotList = ({ isStale = false, hourly, current, isCelsius }) => {
	let currentSnap, time, temp, apparentTemperature
	if (!isStale) {
		currentSnap = <CurrentSnapshot
			key={'now'}
			isCelsius={isCelsius}
			currentForecast={current}
		/>
	}
	const hourlySnaps = hourly.map(f => {
		time = new Date(f.time * 1000)
		temp = Math.round(f.temperature)
		apparentTemperature = Math.round(f.apparentTemperature)
		return <Snapshot
			isCelsius={isCelsius}
			key={f.time}
			time={time}
			precipProb={f.precipProbability}
			iconCode={f.icon}
			temp={temp}
			apparentTemperature={apparentTemperature}
		/>
	})
	const snaps = [currentSnap, ...hourlySnaps]
	return (
		// isStale
		// ? <ScrollView horizontal contentContainerStyle={{ ...styles.snapshotListContainer, borderColor: colors.warning }}>
		// 	{hourlySnaps}
		// </ScrollView>
		<ScrollView horizontal contentContainerStyle={{ ...styles.snapshotListContainer }}>
			{/* fix flashing issue with only current snap showing */}
			{snaps.length > 1 ? snaps : null}
		</ScrollView>
	)
}
const Bar = ({ city }) => {
	return (
		<View style={styles.barContainer}>
			<Text style={styles.barText}>weather forecast</Text>
			<Text style={styles.barAttribution}>Powered By Dark Sky</Text>
		</View>
	)
}





const styles = StyleSheet.create({
	container: {
		shadowColor: colors.darkGrey,
		shadowOffset: {
			width: 3,
			height: 3,
		},
		shadowOpacity: .5,
		shadowRadius: 3,
		backgroundColor: 'white',
		height: 170,
		margin: margin.md,
		borderRadius: 10,

	},
	barContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		padding: padding.xs,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		backgroundColor: colors.lightGrey
	},
	barText: {
		fontSize: fonts.md
	},
	barAttribution: {
		fontSize: fonts.sm,
	},
	emptyContainer: {
		flex: 1,
		// backgroundColor: colors.grey,
		alignItems: 'center',
		justifyContent: 'center',
	},
	snapshotListContainer: {
		// backgroundColor: colors.grey,

		flexDirection: 'row',
		alignItems: 'center',

	},

	CurrentSnapshotTempText: {

	},
	CurrentSnapshotSummText: {

	},
	errorContainer: {
		flex: 1,
		borderTopWidth: 2,
		borderColor: colors.warning,
		alignItems: 'center',
		justifyContent: 'center',

		// backgroundColor: colors.grey,
		padding: padding.sm
	},
	errorText: {
		fontSize: fonts.md
	},
	noDataText: {
		textAlign: 'center',
		paddingTop: padding.md,
	}
})
export default WeatherModule