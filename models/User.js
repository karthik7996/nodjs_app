const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  accStatus: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "basic"
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
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
    unique: true
},
  password: {
    type: String,
    required: true,
  },
  location: {type: String},
  products: [{type: ObjectId}],
  address: {type: String}, 
}, { timestamps: true });


const User= mongoose.model('User', UserSchema);
module.exports = User;


