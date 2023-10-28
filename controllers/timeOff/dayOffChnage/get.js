// internal import
const RequestOffDay = require("../../../models/requestOffDay");

module.exports = async (req, res) => {
  try {
    const datas = await RequestOffDay.find().populate("user", "username").sort("-createdAt");
    res.json({
        datas,
        message: "Successfully get all data",
        success: true,
      });
  } catch (error) { 
    res.json({
        error: error.message,
        message: "Failed to get change off data data",
        success: false
      })
  }
};
