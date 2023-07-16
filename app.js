const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const verifyToken = require('./middleware/verifyToken')
const cors = require('cors')
require('dotenv/config')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

const restrictAccess = (req, res, next) => {
    const allowedOrigins = ['https://animey.vercel.app'];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        next();
    } else {
        res.status(403).json({
            error: 'Akses ditolak'
        });
    }
};

// Import Routes
const filmsRoute = require('./routes/films')
const episodeRoute = require('./routes/episode')
const authRoute = require('./routes/auth')
const historiesRoute = require('./routes/histories')

// Route
app.use('/films', restrictAccess, filmsRoute)
app.use('/episode', restrictAccess, episodeRoute)
app.use('/auth', restrictAccess, authRoute)
app.use('/histories', restrictAccess, historiesRoute)
app.get('/', (req, res) => {
    res.send('Selamat Datang!')
})

// connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Berhasil tersambung ke Database')
})

// Start Server
app.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on port %d', this.address().port)
})