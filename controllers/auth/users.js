// internal import
const Users = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const users = await Users.find().populate({ path: 'timeOff achievements tasks' }).select('-monthlyPayment -dgCoin -payments');
    res.json({
      users,
      message: "Successfully get users",
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
