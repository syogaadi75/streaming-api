const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const verifyToken = require('./middleware/verifyToken')
require('dotenv/config')

app.use(bodyParser.json())

// Import Routes
const filmsRoute = require('./routes/films')
const episodeRoute = require('./routes/episode')
const authRoute = require('./routes/auth')

app.use('/films', filmsRoute)
app.use('/episode', episodeRoute)
app.use('/auth', authRoute)

// Route
app.get('/', (req, res) => {
    res.send('Ouiiii')
}) 

// connect to db
mongoose.connect(process.env.DB_CONNECTION,() => {
    console.log('Berhasil tersambung ke Database')
})

// Start Server
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server listening on port %d',  this.address().port)
})