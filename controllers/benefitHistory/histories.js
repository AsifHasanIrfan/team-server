// internal import
const BenefitHistory = require("../../models/benefitHistory");

module.exports = async (req, res) => {
  try {
    const histories = await BenefitHistory.find().sort({ createdAt: -1 });

    res.json({
      datas: histories,
      message: "Successfully get all histories",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get benefit histories data",
      success: false,
    });
  }
};
