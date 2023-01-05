const chatModel = require("../models/chatModel");
const messageModel = require("../models/messageModel");
exports.createChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(500).json("Invalid or blank id given !");
  }

  let chatExists = await chatModel
    .find({
      $and: [
        { users: { $elemMatch: { $eq: req.user } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users")
    .populate("latestMessage");

  if (chatExists.length > 0) {
    return res.status(201).json(chatExists);
  } else {
    var chatData = {
      users: [req.user, userId],
    };
  }

  try {
    const createChat = await chatModel.create(chatData);

    const sendCreatedChat = await chatModel
      .findOne({
        _id: createChat._id,
      })
      .populate("users");

    return res.status(201).json(sendCreatedChat);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.allChat = async (req, res) => {
  try {
    let allChats = await chatModel
      .find({
        users: { $elemMatch: { $eq: req.user } },
      })
      .populate("users")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(201).json(allChats);
  } catch (err) {
    res.status(500).json(err);
  }
};