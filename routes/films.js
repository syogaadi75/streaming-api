const fs = require('node:fs/promises');
const express = require('express')
const router = express.Router();
const Film = require('../models/Film')
const upload = require('../middleware/multer/upload')
const multer = require('multer')
const mongoose = require('mongoose');
const Episode = require('../models/Episode');

// Get
router.get('/', async (req, res) => {
    try {
        const films = await Film.find()
        res.send(films)
    } catch (error) {
        res.send({
            message: error
        })
    }
})

// Get By Id
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

// Insert
router.post('/', async (req, res) => {
    const film = new Film({
        title: req.body.title,
        synopsis: req.body.synopsis,
        poster: req.body.poster,
        type: req.body.type
    })

    try {
        const savedFilm = await film.save()
        res.send(savedFilm)
    } catch (error) {
        res.send({
            message: error
        })
    }
}
)

// Update
router.put('/:filmId', async (req, res) => {
    var data = {
        title: req.body.title,
        synopsis: req.body.synopsis,
        episode: req.body.status,
        poster: req.body.poster
    }

    try {
        const updatedFilm = await Film.updateOne({
            _id: req.params.filmId
        }, {
            $set: data
        })
        res.send(updatedFilm)
    } catch (error) {
        res.send({
            message: error
        })
    }
}
)

// Delete
router.delete('/:filmId', async (req, res) => {

    try {
        var film = await Film.findById(req.params.filmId)
        if (film.poster) {
            await fs.unlink("images/poster/" + film.poster)
        }

        const filmRemoved = await film.remove()
        res.send({
            message: filmRemoved
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

module.exports = router