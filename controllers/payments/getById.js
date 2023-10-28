// internal import
const Payment = require("../../models/payment");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {

    // if not this mail can not access this api
    if (req.user.email !== 'asifhasanirfan@gmail.com') {
      return res.send({ message: 'You are not authorized!', success: false });
    }

    const payments = await Payment.find({ user: req.params.id }).sort("-createdAt");
    res.json({
      datas: payments,
      message: "Successfully get all data",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get payments data",
      success: false
    })
  }
};
