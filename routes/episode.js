const Episode = require('../models/Episode')
const Film = require('../models/Film')
const fs = require('node:fs/promises')
const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/:filmId', async (req, res) => {
    try {
        var film = await Film.findById(req.params.filmId)
        var data = await Episode.find({
            id_film: req.params.filmId
        })
        res.send({
            film: film,
            episodes: data
        })
    } catch (error) {
        res.send({
            message: error
        })
    }
})

router.post('/:filmId', async (req, res) => {
    try {
        var dataFilm = await Episode.find({
            id_film: req.params.filmId
        })

        const eps = new Episode({
            id_film: req.params.filmId,
            no: dataFilm.length + 1,
            video: req.body.video,
        })

        const savedEpisode = await eps.save()
        const updated = await Film.updateOne({
            _id: req.params.filmId
        }, {
            updated_at: new Date().getTime()
        })
        res.send(savedEpisode)
    } catch (error) {
        res.send({
            message: error
        })
    }
})

router.delete('/:episodeId', async (req, res) => {
    try {
        var episode = await Episode.findById(req.params.episodeId)
        const removedEpisode = await episode.remove()
        res.send(removedEpisode)
    } catch (error) {
        res.send({
            message: error
        })
    }
})

router.get('/getVideo/:episodeId', async (req, res) => {
    try {
        var data = await Episode.findById(req.params.episodeId)
        data.video = path.join(__dirname, '..', 'videos', data.video)
        res.sendFile(data.video)
    } catch (error) {
        res.send({
            message: error
        })
    }
})

module.exports = router