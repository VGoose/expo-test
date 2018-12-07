import STATIONS from './stations.json';
import { diff, getEuclideanDist } from '../utils/helpers';

async function getNearbyStations() {
	let position = await getUserPosition();
	let userLat = position.coords.latitude;
	let userLon = position.coords.longitude;
	let x, y, dist;
	const dists = new Set();
	let _stations = [];
	for (let key in STATIONS) {
		let stopLat = parseFloat(STATIONS[key].stop_lat);
		let stopLon = parseFloat(STATIONS[key].stop_lon);
		//constants are rough estimates of miles per degree of lat/lon for NYC
		x = diff(userLat, stopLat) * 69.05;
		y = diff(userLon, stopLon) * 52.35;
		dist = getEuclideanDist(x, y);
		//removing N/S stations, same info as parent station
		if (dist < 0.5
			&& key.split('').slice(-1)[0] !== 'N'
			&& key.split('').slice(-1)[0] !== 'S') {

			STATIONS[key].dist = dist;
			_stations.push(STATIONS[key])
			dists.add(dist)
		}
	}
	_stations.sort((a, b) => {
		return a.dist - b.dist;
	})
	return _stations
}

function getUserPosition() {
	if (!navigator.geolocation) {
		return 'Your browser does not support gelocation';
	}
	let geo = navigator.geolocation;
	return new Promise((resolve, reject) => {
		geo.getCurrentPosition(resolve, reject)
	})
}

module.exports = {
	getNearbyStations,
	getUserPosition,
}