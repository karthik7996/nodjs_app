const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authenticator');
const bidController = require('../controllers/bid');

router.put('/:productId', authenticateJWT, bidController.placeBid);
router.get('/', authenticateJWT, bidController.readUserBid);
module.exports = router;
