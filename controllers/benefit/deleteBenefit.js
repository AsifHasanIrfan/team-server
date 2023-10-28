// internal import
const Benefit = require("../../models/benefit");

module.exports = async (req, res) => {
  try {
    const { benefitId } = req.params;
    const verifyBenefit = await Benefit.findOne({ _id: benefitId });

    if (verifyBenefit) {
      await Benefit.deleteOne({ _id: benefitId });
      res.json({ message: "Benefit successfully deleted", success: true });
    } else {
      return res.send({ message: "Benefit not found", success: false });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to delete Benefit",
      success: false,
    });
  }
};
