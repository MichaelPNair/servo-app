const express = require('express')
const router = express.Router()

const Station = require('../models/servo')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/stations/all', (req, res) => {
    Station.findAll()
        .then(station => res.json(station))
})

router.get('/stations/random', (req, res) => {
    Station.randomStation()
        .then(station => res.json(station))
})

router.get('/stations/bounds', (req, res) => {
    let neLat = req.query.neLat
    let neLng = req.query.neLng
    let swLat = req.query.swLat
    let swLng = req.query.swLng 

    const coordinates = [neLat, neLng, swLat, swLng]
 
    Station.getAllBoundStations(coordinates)
        .then(stations => res.json(stations))

})


router.get('/owners', (req, res) => {
    Station.findOwner()
        .then(station => res.json(station))
})

router.get("/stats", (req, res) => {
    Station.getStats()
        .then(stats => res.json(stats))   
})


module.exports = router