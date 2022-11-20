const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/Private/Auction project v2/client/src/components/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`)
  }
})

const upload = multer({ storage })

module.exports = upload;