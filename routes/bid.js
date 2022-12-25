const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authenticator');
const bidController = require('../controllers/bid');

router.put('/:productId', authenticateJWT, bidController.placeBid);
router.get('/', authenticateJWT, bidController.readUserBid);
router.get('/notification',authenticateJWT, bidController.readNotification)
router.post('/', authenticateJWT, bidController.acceptBid)
router.post('/withdraw', authenticateJWT, bidController.withDraw)
router.post('/reject', authenticateJWT, bidController.reject)
module.exports = router;
