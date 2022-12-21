const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const NotificationSchema = new mongoose.Schema({
    sellerId: ObjectId,
    productId: ObjectId,
  },{timestamps: true});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = NotificationSchema;