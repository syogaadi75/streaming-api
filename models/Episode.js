const mongoose = require('mongoose')
const {
    Schema
} = require('mongoose')

const EpisodeSchema = mongoose.Schema({
    id_film: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    no: {
        type: Number,
        requred: true
    },
    video: {
        type: String,
        requred: true
    },
    bvideo: {
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
})

module.exports = mongoose.model('Episodes', EpisodeSchema);