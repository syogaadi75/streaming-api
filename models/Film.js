const mongoose = require('mongoose')

const FilmSchema = mongoose.Schema({
    poster: {
        type: String,
        requred: true
    },
    title: {
        type: String,
        requred: true
    },
    synopsis: {
        type: String,
        requred: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    episode: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Films', FilmSchema);