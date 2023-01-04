const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtExpire, jwtSecret } = require('../config/keys');
const { sendMail } = require("../middlewares/sendMail");

exports.signupController = async (req, res) => {
  console.log(req.body);
  const { name, email, phoneNr,password } = req.body;

  try {
    const user = await User.findOne({  email });
    if (user) {
      return res.status(400).json({
        error: 'This email is already exist',
      });
    }

    const newUser =  new User();
    newUser.role = "user";
    newUser.accStatus = false;
    newUser.name = name;
    newUser.email = email;
    newUser.phoneNr = phoneNr;
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        error: 'Email and password do not match',
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
      const { _id, accStatus,role, name, email, phoneNr,  address } = user;
      return res.json({
        token,
        user: { _id, accStatus, role, name, email, phoneNr, address },
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

exports.forgotPassword = async (req, res, next) => {
  console.log(req.body)
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const token = jwt.sign({_id:user._id}, jwtSecret, { expiresIn: "300s" })
  user.resetPasswordtoken = token;
  await user.save();
  const resetUrl = `${req.protocol}://localhost:3000/reset/${token}`;

  const message = `
  Hello,	
 
  We received a request to reset the password for the BidOnBuy account associated with ${user.email}

  Your password reset url is ${resetUrl}

  And yes, don't share this link to anyone. It's a secret and valid for 5 minutes.

  If you didn't request to reset your password, contact us via our support site. No changes were made to your account yet.

  -The BidOnBuy Team`;

  try {
    await sendMail({
      email: user.email,
      subject: "Reset your BidOnBuy password",
      message: message,
    });

    res.status(200).json({
      message: `Email sent successfully to ${user.email}`,
    });
  } catch (err) {
    return res.status(404).json({ message: "error"});
  }
};

exports.resetPassword = async (req, res) => {

  const {token} = req.params;
  try{
  const user = await User.findOne({resetPasswordtoken: token});
  
  const verifyToken = jwt.verify(token, jwtSecret);
  if (!(user && verifyToken._id)) {
    return res.status(400).json({ err: "Link is invalid or has expired" });
  }
  return res.status(200).json({message: "Link is valid for only 5 min"})
}
catch(error) {
  return res.status(400).json({err:"undefined error while changing password"})
}
};

exports.changePassword = async (req, res) => {

  const {token} = req.params;
  try{
  const user = await User.findOne({resetPasswordtoken: token});
  
  const verifyToken = jwt.verify(token, jwtSecret);
  console.log(verifyToken)
  if (!(user && verifyToken._id)) {
    return res.status(400).json({ err: "Link is invalid or has expired" });
  }
  else{ 
    await User.findByIdAndUpdate(user._id, { $unset: { resetPasswordtoken: "" }})
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    return res.status(200).json({ message: "password successfully updated" });
  }
}
catch(error) {
  console.log(error)
  return res.status(400).json({err:"Link is expired"})
}
}
