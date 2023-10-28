// internal import
const Salary = require("../../models/salary");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const salaries = await Salary.find()
        .populate("user", "_id firstName lastName")
        .sort({ updatedAt: -1 });

      res.json({
        datas: salaries,
        message: "Successfully get all data",
        success: true,
      });
    } else {
      if (req.user.role === "employee") {
        const user = await User.findById(req.user._id).populate({
          path: "salaries",
          model: "Salary",
          select: "-_id",
          options: { sort: { updatedAt: -1 } },
        }).select("firstName lastName");

        res.json({
          datas: user,
          message: "Successfully get all data",
          success: true,
        });
      }
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get salary data",
      success: false,
    });
  }
};
