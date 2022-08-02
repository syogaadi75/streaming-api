const Episode = require('../models/Episode')
const Film = require('../models/Film')
const fs = require('node:fs/promises')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = require('../middleware/multer/upload')

router.get('/:filmId', async (req, res) => {
    try {
        var film = await Film.findById(req.params.filmId)
        var data = await Episode.find({id_film: req.params.filmId})
        res.send({
            film: film,
            episodes: data
        })
    } catch (error) {
        res.send({message: error})
    }
})

router.post('/:filmId', upload.fields([{name: 'video', maxCount: 1}]), async (req, res) => {
    try {
        if(Object.keys(req.files).length === 0) {
            res.send({message: 'File video dibutuhkan'})
            return false
        } 

        const eps = new Episode({
            id_film: req.params.filmId,
            no: req.body.no,
            video: req.files.video[0].filename,
        })

        const savedEpisode = await eps.save()
        res.send(savedEpisode)
    } catch (error) {
        res.send({message: error})
    }
})

router.delete('/:episodeId', async (req, res) => {
    try {
        var episode = await Episode.findById(req.params.episodeId) 
        if(episode.video) {
            await fs.unlink("videos/"+episode.video)
        }

        const removedEpisode = await episode.remove()
        res.send(removedEpisode)
    } catch (error) {
        res.send({message: error})
    }
})

module.exports = router