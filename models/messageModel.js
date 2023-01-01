const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      userIdSent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      message: String,
    },
  ],
});

module.exports = mongoose.model("messageSchema", messageSchema);
