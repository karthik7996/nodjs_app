const messageModel = require("../models/messageModel");
const chatModel = require("../models/chatModel");
const notificationModel = require("../models/notificationModel");
exports.sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!chatId || !content) {
    return res
      .status(500)
      .json({ message: "chatId and content was not provided" });
  }

  let newMessage = {
    sender: req.user,
    content,
    chatId,
  };

  try {
    let message = await messageModel.create(newMessage);
    message.populate(["sender", "chatId"]);
    await chatModel.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    return res.status(201).json(message);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.fetchAllMessage = async (req, res) => {
  try {
    const { chatId } = req.params;

    const allMessage = await messageModel
      .find({ chatId })
      .populate(["sender", "chatId"]);

    return res.status(201).json(allMessage);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//notification controller

exports.addNewNotification = async (req, res) => {
  try {
    const { notification, userId } = req.body;
    const alreadyExist = await notificationModel.findOne({
      notificationId: notification,
    });
    if (alreadyExist) return res.send("duplicates not allowed");
    console.log(req.body);
    var newNotification = await notificationModel.create({
      user: userId,
      notificationId: notification,
    });
    newNotification = await newNotification.populate("user");
    newNotification = await newNotification.populate("notificationId");
    newNotification = await newNotification.populate("notificationId.sender");
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deleteNotification = async (req, res) => {
  try {
    var newNotification = await notificationModel.deleteMany({
      user: req.user,
    });
    res.status(202).json(newNotification);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getNotification = async (req, res) => {
  try {
    var notificationItem = await notificationModel
      .find({
        user: req.user,
      })
      .populate("user")
      .populate("notificationId");

    res.status(200).json(notificationItem);
  } catch (err) {
    res.status(500).json(err);
  }
};