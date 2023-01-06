const mongoose = require("mongoose");

const chatModel = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messageModel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chatModel", chatModel);