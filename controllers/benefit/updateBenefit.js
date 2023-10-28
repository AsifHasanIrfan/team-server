// internal import
const Benefit = require("../../models/benefit");

module.exports = async (req, res) => {

  try {
    const data = req.body;
    
    const verifyBenefit = await Benefit.find({ _id: req.params.benefitId });

    if (verifyBenefit) {
      const updatedData = await Benefit.findOneAndUpdate(
        { _id: req.params.benefitId },
        data,
        { new: true }
      );

      res.json({
        message: "Benefit successfully updated",
        success: true,
        updated: updatedData,
      });
    } else {
      return res.json({ message: "Benefit not found", success: false });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to update benefit",
      success: false,
    });
  }
};