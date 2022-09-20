const mongoose = require('mongoose')

const HistoriesSchema = mongoose.Schema({
    ip: {
        type: String,
        requred: true
    },
    episodes: {
        type: Array,
        _id: {
            type: String
        },
        insertAt: {
            type: Date,
            default: Date.now
        },
    }
})

module.exports = mongoose.model('histories', HistoriesSchema);