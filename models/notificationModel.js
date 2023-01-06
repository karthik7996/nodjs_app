const mongoose = require("mongoose");

const notificationModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "messageModel",
  },
});

module.exports = mongoose.model("notificationModel", notificationModel);