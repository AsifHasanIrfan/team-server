// internal import
const Users = require("../../models/users");

module.exports = async (req, res) => {
  try {

    // if not this mail can not access this api
    if(req.user.email !== 'asifhasanirfan@gmail.com'){
      return res.send({ message: 'You are not authorized!', success: false });
  }

    const users = await Users.find().populate({ 
        path: 'timeOff benefits dgDetails drawbacks salaries payments tasks achievements purchasedBenefits purchasedTimeoffs' 
    });
    res.json({
      users,
      message: "Successfully get users all data",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get users",
      success: false,
    });
  } 
};