// internal import
const Attendance = require("../../models/attendance");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {

    // if not this mail can not access this api
    if (req.user._id.toString() !== req.body.user.toString()) {
      return res.send({ message: 'You are not authorized token!', success: false });
    }

    // Find user record
    const user = await User.findOne({ _id: req.body.user });
    if (!user) return res.send({ message: "User not found!", success: false });

    const today = new Date();

    const findTodayAttendence = await Attendance.findOne({
      user: req.body.user,
      createdAt: { $gte: today.toISOString().slice(0, 10) }
    });

    if (findTodayAttendence) {
      return res.send({ message: "Already Checked In!", success: false });
    }

    // Save Attendance record in the database
    const attendance = new Attendance(req.body);
    const result = await attendance.save();

    // Attendance record adding to the user schema
    if (result._id) {
      await User.findOneAndUpdate(
        { _id: req.body.user },
        {
          $push: { attendance: result._id },
        },
        { new: true }
      );
    }

    res.json({
      data: attendance,
      message: "Checked In Successfully!",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to create attendance!",
      success: false,
    });
  }
};
