const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const { authenticateJWT } = require('../middlewares/authenticator');

router.post('/', authenticateJWT, profileController.update)
// router.get('/', authenticateJWT, categoryController.readAll)

module.exports = router;