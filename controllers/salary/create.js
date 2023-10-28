// internal import
const Salary = require("../../models/salary");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const salary = new Salary({ ...req.body, user });

    await User.findOneAndUpdate({ _id: req.body.userId },{
        $push: { salaries: salary._id },
      },{ new: true }
    );
    await salary.save();

    res.json({
      salary: salary,
      message: "Successfully salary submitted",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to create salary",
      success: false,
    });
  }
};
