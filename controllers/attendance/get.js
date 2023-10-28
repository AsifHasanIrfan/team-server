// internal import
const Attendance = require("../../models/attendance");

module.exports = async (req, res) => {

  try {
    const getDate = req.query.today;
    const date = new Date(getDate);

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const datas = await Attendance.find({
      user: req.query.userId,
      createdAt: { $gt: firstDay, $lt: lastDay },
    }).populate("user", "firstName lastName");

    res.json({
      count: datas.length,
      datas,
      message: "Successfully get all data",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get attendance data",
      success: false
    })
  }
};
