const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  accStatus: {
    type: Boolean,
  },
  role: {
    type: String,
  },
  resetPasswordtoken: String,
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  onBid:[{
    productId: ObjectId,
    bidAmount: Number,
  }
],
  phoneNr:  {
    type: String,
    required: true,
    trim: true,
},
  password: {
    type: String,
    required: true,
  },
  location: {type: String},
  products: [{type: ObjectId}],
  address: {type: String}, 
  notification: [
    { 
      type: new mongoose.Schema(
        {
          sellerId: ObjectId,
          productId: ObjectId,
          productName: String,
        },
        {timestamps:true}
      )
    }
  ],
}, { timestamps: true });


const User= mongoose.model('User', UserSchema);
module.exports = User;


