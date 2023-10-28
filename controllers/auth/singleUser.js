// internal import
const Users = require("../../models/users");

module.exports = async (req, res) => { 
  try {

    if(req.user.role !== 'admin'){
      if(req.user._id.toString() !== req.params.userId.toString()){
        return res.send({ message: 'You are not authorized token!', success: false });
      }
    }

    const getUserParam = req.params.userId;
    const user = await Users.findOne({ _id: getUserParam }).populate({ path: 'timeOff drawbacks purchasedBenefits achievements attendance' }).select('-monthlyPayment -payments');
    res.json({
      user,
      message: "Successfully get user",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get user",
      success: false,
    });
  }
};
