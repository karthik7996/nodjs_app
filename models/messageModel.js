const mongoose = require("mongoose");

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatModel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messageModel", messageModel);
