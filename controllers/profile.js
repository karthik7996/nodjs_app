const User = require('../models/user');

exports.update = async (req, res) => {
  console.log(req.body);
  const { _id,  name, phoneNr, address, email, location} = req.body;

  try {

    const phoneNrExist = await User.findOne({email});
    console.log(phoneNrExist)
    if (email && phoneNrExist._id != _id) {
      return res.status(400).json({
        error: 'This email already exist',
      });
    }

    const user = await User.findByIdAndUpdate({_id: _id}, {name, phoneNr, address, email, location});
    role = user.role
    accStatus = user.accStatus
    res.json({
      message: 'Profile Updated Sucessfully!',
    });
  } catch (error) {
    console.log('profileController error', error)
    res.status(500).json({
      error: 'Error saving user in database. Try signup again',
    });
  }
}


exports.getLoggedInUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user });

  return res.status(201).json(user);
};
