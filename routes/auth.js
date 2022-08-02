const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const verifyToken = require('../middleware/verifyToken')

router.get('/me', verifyToken, async (req, res) => {
    try {
        const userData = await User.findById(req.userId, {password: false})
        res.json(userData)

    } catch (error) {
        res.json({message: error})
    }
})

router.post('/register', async (req, res) => {
    try { 
        var hashPassword = bcrypt.hashSync(req.body.password, 8)
    
        const userData = await User.create({
            nama: req.body.nama,
            email: req.body.email,
            password: hashPassword,
        })
        var token = await jwt.sign({id: userData._id}, config.secret, {expiresIn: 86400})
        res.json({auth: true, token: token})
    } catch (error) {
        res.json(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({email: req.body.email})
        if(!userData) return res.json({message: 'Email tidak ditemukan'})

        const verifyPassword = await bcrypt.compareSync(req.body.password, userData.password)
        if(!verifyPassword) return res.json({message: 'Password salah'})
        const token = await jwt.sign({id: userData._id}, config.secret, {expiresIn: 86400})
        res.json({auth: true, token: token})
    } catch (error) {
        res.json({message: error})
    }
})

router.get('/logout', async (req, res) => {
    try {
        res.json({auth: false, token: null})
    } catch (error) {
        res.json({message: error})
    }
})

module.exports = router