const express = require('express')
const router = express.Router()

// All Authors Route
router.get('/', (req, res) => {
    res.render('authors/index')
})

// New Authors Route
router.get('/new', (req, res) => {
    res.render('authors/new')
})

// Create Author Route
router.post('/', (req, res) => { // post per creare nuovo autore
    res.send('Create') // send: invio al server
})

module.exports = router