const fs = require('node:fs/promises');
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Histories = require('../models/Histories');

// Get
router.get('/:dataIp', async (req, res) => {
    try {
        const history = await Histories.findOne({ ip: req.params.dataIp })
        res.send(history)
    } catch (error) {
        res.send({
            message: error
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const history = Histories.create({ ip: req.body.ip })
        res.send(history)
    } catch (error) {
        res.send({
            message: error
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const cekHistory = await Histories.findOne({ $and: [{ _id: req.params.id }, { 'episodes._id': req.body.episode }] })
        if (!cekHistory) {
            const dataHistory = await Histories.findOne({ _id: req.params.id })
            if (dataHistory.episodes.length >= 10) {
                await Histories.updateOne({ _id: req.params.id }, { $pull: { episodes: { _id: dataHistory.episodes[0]._id } } })
            }

            const addHistory = await Histories.updateOne({ _id: req.params.id }, {
                $push: {
                    episodes: {
                        _id: req.body.episode,
                        insertAt: Date()
                    }
                }
            })
            res.send(addHistory)
            return false
        }
        res.send({ error: true, message: 'Episode ini sudah terdaftar' })
    } catch (error) {
        res.send({
            message: error
        })
    }
})

module.exports = router