// internal import
const TeamReward = require("../../models/teamReward");

module.exports = async (req, res) => {
  try {
    const datas = await TeamReward.find();
    res.json({
        datas,
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
