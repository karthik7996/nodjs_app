const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  status: {
    type: Boolean,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profileImage: {
    public_id: String,
    url: String,
  },
  aadhar: {
    public_id: String,
    url: String,
  },
});

module.exports = mongoose.model("verficationSchema", verificationSchema);
