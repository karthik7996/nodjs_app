const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  tokens: [{
    token: {
        type: String,
        required: true
    }
  }],    
  address: {type: String}, 
}, { timestamps: true });


const User= mongoose.model('User', UserSchema);
module.exports = User;


