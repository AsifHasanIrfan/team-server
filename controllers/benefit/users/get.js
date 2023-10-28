// internal import
const Benefit = require("../../../models/benefit");

module.exports = async (req, res) => {
  try {
    const benefits = await Benefit.find().populate('users', "firstName").sort({ createdAt: -1 }).select("-description");
    res.json({
        datas: benefits,
        message: "Successfully get all data",
        success: true,
      });
  } catch (error) { 
    res
      .json({
        error: error.message,
        message: "Failed to get contact data",
        success: false
      })
  }
};
