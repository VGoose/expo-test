function diff(a, b) {
	return Math.abs(a - b);
}

function getEuclideanDist(a, b) {
	let _a = parseFloat(a),
		_b = parseFloat(b);
	if(!_a || !b) {
		throw new Error('Both arguments must be numbers');
	}

	let result = Math.sqrt(_a**2 + _b**2);
	return result;
}

module.exports = {
	getEuclideanDist,
	diff
}