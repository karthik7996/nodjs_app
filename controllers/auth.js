const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtExpire, jwtSecret } = require('../config/keys');

exports.signupController = async (req, res) => {
  console.log(req.body);
  const { name, email, phoneNr,password , location } = req.body;

  try {
    const user = await User.findOne({  phoneNr });
    if (user) {
      return res.status(400).json({
        error: 'This phone Number is already exist',
      });
    }

    const newUser =  new User();
    newUser.role = "user";
    newUser.accStatus = false;
    newUser.name = name;
    newUser.email = email;
    newUser.phoneNr = phoneNr;
    newUser.location = location;
    newUser.address = ""
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    console.log(newUser.password);
    await newUser.save();
    res.json({
      message: 'Signup success! Please signin',
    });
  } catch (error) {
    console.log('signupController error', error)
    res.status(500).json({
      error: 'Error saving user in database. Try signup again',
    });
  }
}

exports.signinController = async (req, res) => {
  console.log(req.body);
  const { phoneNr, password } = req.body;
  try {
    const user = await User.findOne({ phoneNr });
    if (!user) {
      return res.status(400).json({
        error: 'User with that phone Number does not exist. Please signup',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        error: 'Phone Number and password do not match',
      });
    }

    const payload = {
      user: {
        _id: user._id,
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) {
        console.log('jwt error', err);
      }
      const { _id, accStatus,role, name, email, phoneNr, location, address, } = user;
      return res.json({
        token,
        user: { _id, accStatus, role, name, email, phoneNr, location,address },
      });
    });

    // res.json({
    //   message: 'Signin success',
    // });
  } catch (error) {
    console.log('signinController error', error)
    res.status(500).json({
      error: 'Server error. Try signin again',
    });
  }
}
