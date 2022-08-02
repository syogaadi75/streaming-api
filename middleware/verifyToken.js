const jwt = require('jsonwebtoken')
const config = require('../config')

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token']
    if(!token) return res.json({message: 'Token Tidak ditemukan'})

    jwt.verify(token, config.secret, (err, decode) => {
        if(err) return res.json({message: 'Gagal mengautentikasi token'})

        req.userId = decode.id
        next()
    })
}

module.exports = verifyToken