const fs = require('fs');
const STATIONS = require('./stations.json');

// const fs = require('fs');
// const { promisify } = require('util');

// const STATIONS = require('./static/stations.json');

(function removeStations() {
  //parent stations are stations without N/S suffix
  let parentStations = []

  for(let key in STATIONS) {
    if(key.split('').slice(-1)[0] === 'N' || key.split('').slice(-1)[0] === 'S'){
      continue
    }
    parentStations.push(STATIONS[key])
  }
  fs.writeFile('src/static/parentStations.json', JSON.stringify(parentStations), 'utf8', (error) => {
		if (error) throw error;
		console.log('data written');
  })
  console.log('a')
})()