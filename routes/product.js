const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authenticator');
const upload = require('../middlewares/multer');
const productController = require('../controllers/product');

router.post('/', authenticateJWT, upload.single('productImage'), productController.create);
router.get('/', productController.readAll);
router.get('/currentUser', authenticateJWT, productController.readCurrentUserProduct);
router.get('/:id', productController.readSingle)
router.delete('/:id', authenticateJWT, productController.delete);
router.put('/:productId', authenticateJWT, productController.update);

module.exports = router;