const multer = require('multer')
const path = require('path')

const posterStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        var location = ''
        file.fieldname == 'poster' ? location = path.join(__dirname, "../../images/poster") : location = path.join(__dirname, "../../videos")
        cb(null, location)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+""+Math.floor(Math.random() * 10)+path.extname(file.originalname))
    }
});

module.exports = multer({storage: posterStorage})