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

router.get('/owners', (req, res) => {
    Station.findOwner()
        .then(station => res.json(station))
})

module.exports = router