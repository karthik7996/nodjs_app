const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { authenticateJWT } = require('../middlewares/authenticator');

router.post('/', authenticateJWT, categoryController.create)
router.get('/',  categoryController.readAll)
router.get('/:categoryName', categoryController.readProducts)
module.exports = router;