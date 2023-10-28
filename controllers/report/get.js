// internal import
const Report = require("../../models/report");

module.exports = async (req, res) => {
  try {
    const datas = await Report.find().populate("user member", "firstName lastName -_id").sort("-createdAt");
    res.json({
        datas,
        message: "Successfully get all data",
        success: true,
      });
  } catch (error) { 
    res.json({
        error: error.message,
        message: "Failed to get Report data",
        success: false
      })
  }
};
