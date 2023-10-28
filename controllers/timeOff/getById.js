// internal import
const TimeOff = require("../../models/timeOff");

module.exports = async (req, res) => {
  try {

    // checking is that user trying to get data
    if (req.user.role !== 'admin') {
      if (req.user._id.toString() !== req.params.id.toString()) {
        return res.send({ message: 'You are not authorized token!', success: false });
      }
    }

    const timeoffs = await TimeOff.find({ user: req.params.id }).sort("-createdAt");
    res.json({
      datas: timeoffs,
      message: "Successfully get all data",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get time off data",
      success: false
    })
  }
};