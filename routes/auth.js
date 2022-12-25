const express = require('express');
const router = express.Router();
const { signupValidator, signinValidator, validatorResult} = require('../middlewares/validator');
const { signupController, signinController, forgotPassword, resetPassword, changePassword} = require('../controllers/auth');

router.post('/signup', signupValidator, validatorResult, signupController);
router.post('/signin', signinValidator, validatorResult, signinController);
router.post('/forgotpassword', forgotPassword);
router.get('/resetPassword/:token', resetPassword)
router.post('/:token',changePassword)


module.exports = router;