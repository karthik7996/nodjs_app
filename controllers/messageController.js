const messageModel = require("../models/messageModel");

exports.createMessage = async (req, res) => {
  let checkmessage1Exists = await messageModel.findOne({
    userA: req.body.reciever,
    userB: req.body.loggedInUser,
  });
  let checkmessage2Exists = await messageModel.findOne({
    userA: req.body.loggedInUser,
    userB: req.body.reciever,
  });
  if (!checkmessage1Exists && !checkmessage2Exists) {
    let message = await messageModel.create({
      userA: req.body.reciever,
      userB: req.body.loggedInUser,
    });
    return res.status(201).json(message);
  }

  res.status(201).json({});
};
exports.getMessages = async (req, res) => {
  let mesmodel = await messageModel.findOne({
    userA: req.user,
    userB: req.params.id,
  });
  if (!mesmodel) {
    mesmodel = await messageModel.findOne({
      userA: req.params.id,
      userB: req.user,
    });
  }
  mesmodel && (await mesmodel.populate("messages.userIdSent"));
  console.log(mesmodel);
  return res.status(201).json(mesmodel);
};

exports.getAllMessage = async (req, res) => {
  let allMessage = await messageModel.find();
  res.status(201).json(allMessage);
};
