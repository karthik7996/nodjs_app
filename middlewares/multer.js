const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/wamp64/www/BidOnBuy/client/src/components/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`)
  }
})

const upload = multer({ storage })

module.exports = upload;