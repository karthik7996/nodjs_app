const verificationModel = require("../models/verificationModel");
const cloudinary = require("cloudinary");
const User = require("../models/user");
exports.createVerification = async (req, res) => {
  try {
    const upload1 = await cloudinary.v2.uploader.upload(req.body.profileImage, {
      folder: "profileImage",
      width: 150,
      crop: "scale",
    });
    const upload2 = await cloudinary.v2.uploader.upload(req.body.aadhar, {
      folder: "aadhar",
      width: 150,
      crop: "scale",
    });

    const verification = await verificationModel.create({
      user_id: req.user._id,
      status: false,
      profileImage: {
        public_id: upload1.public_id,
        url: upload1.secure_url,
      },
      aadhar: {
        public_id: upload2.public_id,
        url: upload2.secure_url,
      },
    });

    res.status(201).json(verification);
  } catch (err) {
    console.log(err.message);
  }
};

exports.allVerifications = async (req, res) => {
  try {
    let data = await verificationModel
      .find({ status: false })
      .populate("user_id");
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.acceptVerification = async (req, res) => {
  let verification = await verificationModel.findOne({
    user_id: req.params.userId
  });
  verification.status = true;
  await verification.save();
  let user = await User.findOne({ _id: req.params.userId });
  user.accStatus = true;
  await user.save();
  let data = await verificationModel
    .find({ status: false })
    .populate("user_id");
  res.status(201).json(data);
};

exports.deleteVerification = async (req, res) => {
  console.log(req.params.id)
  let updatedData = await verificationModel.findOneAndDelete({
    _id: req.params.id
  });
  let data = await verificationModel
    .find({ status: false })
    .populate("user_id");
  res.status(201).json(data);
};