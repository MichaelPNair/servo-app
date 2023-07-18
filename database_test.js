require('dotenv').config()
const Station = require('./models/servo')

// Station
//     .findAll()
//     .then(station => console.log(station))

Station.findOwner()
    .then(station => console.log(station))