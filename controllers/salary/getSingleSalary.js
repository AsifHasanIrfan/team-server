// internal import
const Salary = require("../../models/salary");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;

      // checking is that user trying to get data
      if (req.user._id.toString() !== req.params.userId.toString()) {
        return res.send({ message: 'You are not authorized token!', success: false });
    }

    if (userId) {
      const salary = await Salary.find({ user: userId });

      res.json({
        datas: salary,
        message: "Successfully get all data",
        success: true,
      });
    } else {
      res.json({
        message: "No user found!",
        success: false,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get salary data",
      success: false,
    });
  }
};
