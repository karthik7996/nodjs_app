const express = require("express");
const { createChat, allChat } = require("../controllers/chatController");
const {
  sendMessage,
  fetchAllMessage,
  addNewNotification,
  deleteNotification,
  getNotification,
} = require("../controllers/messageController");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authenticator");

router.post("/createchat", authenticateJWT, createChat);
router.get("/allchat", authenticateJWT, allChat);
router.post("/sendmessage", authenticateJWT, sendMessage);
router.get("/allmessage/:chatId", authenticateJWT, fetchAllMessage);
router.post("/createchatnotification", authenticateJWT, addNewNotification);
router.get("/deletechatnotification", authenticateJWT, deleteNotification);
router.get("/allchatnotification", authenticateJWT, getNotification);

module.exports = router;