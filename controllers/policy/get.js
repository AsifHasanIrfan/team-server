// internal import
const Policy = require("../../models/policy");

module.exports = async (req, res) => {
  try {
    const datas = await Policy.find();
    res.json({
        data: datas[0],
        message: "Successfully get all data",
        success: true,
      });
  } catch (error) { 
    res.json({
        error: error.message,
        message: "Failed to get policy data",
        success: false
      })
  }
};
