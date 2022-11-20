const User = require('../models/user');

exports.update = async (req, res) => {
  console.log(req.body);
  const { _id,  name, phoneNr, address, email, location} = req.body;

  try {

    const phoneNrExist = await User.findOne({phoneNr});
    console.log(phoneNrExist)
    if (phoneNrExist && phoneNrExist._id != _id) {
      return res.status(400).json({
        error: 'This Phone Number already exist',
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
