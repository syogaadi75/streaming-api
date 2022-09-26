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
    type: {
        type: String,
        default: 'episode'
    },
    tamat: {
        type: Boolean,
        default: false
    },
    category: {
        type: Array
    }
})

module.exports = mongoose.model('Films', FilmSchema);