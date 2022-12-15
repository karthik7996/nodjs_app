const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const { authenticateJWT } = require('../middlewares/authenticator');
const verficationController = require("../controllers/verificationController");


router.post('/', authenticateJWT, profileController.update)
// router.get('/', authenticateJWT, categoryController.readAll)
//changes for verification
router.post(
    "/verify",
    authenticateJWT,
    verficationController.createVerification
  );
  router.get(
    "/verifications",
    authenticateJWT,
    verficationController.allVerifications
  );
  router.get(
    "/accept/verifications/:userId",
    authenticateJWT,
    verficationController.acceptVerification
  );
  router.get(
    "/delete/verification/:id",
    authenticateJWT,
    verficationController.deleteVerification
  );
module.exports = router;