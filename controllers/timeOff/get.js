// internal import
const TimeOff = require("../../models/timeOff");

module.exports = async (req, res) => {
  try {
    const timeoffs = await TimeOff.find().populate('user', "username").sort("-createdAt");
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
