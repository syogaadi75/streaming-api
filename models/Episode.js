const mongoose = require('mongoose')
const {Schema} = require('mongoose')

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
})

module.exports = mongoose.model('Episodes', EpisodeSchema);