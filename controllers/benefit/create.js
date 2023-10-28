// internal import
const Benefit = require("../../models/benefit");

module.exports = async (req, res) => {
  try {
    const benefit = new Benefit(req.body);
    await benefit.save();

    res.json({
      datas: benefit,
      message: "Successfully benefit created",
      success: true
    });

  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to create benefit!",
      success: false
    });
  }
};