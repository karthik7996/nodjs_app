const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authenticator");
const productController = require("../controllers/product");
const messageController = require("../controllers/messageController");
router.post("/", authenticateJWT, productController.create);
router.get("/", productController.readAll);
router.get(
  "/currentUser",
  authenticateJWT,
  productController.readCurrentUserProduct
);
router.get("/:id", productController.readSingle);
router.delete("/:id", authenticateJWT, productController.delete);
router.put("/:productId", authenticateJWT, productController.update);

router.post(
  "/create/message",
  authenticateJWT,
  messageController.createMessage
);

router.get("/get/messages/:id", authenticateJWT, messageController.getMessages);

router.get("/all/message", authenticateJWT, messageController.getAllMessage);
module.exports = router;
