// internal import
const Benefit = require("../../models/benefit");
const User = require("../../models/users");
const BenefitHistory = require("../../models/benefitHistory");

module.exports = async (req, res) => {
  
  try {
    const data = req.body;

    const verifyBenefitHistory = await BenefitHistory.find({
      _id: req.params.benefitHistoryId,
    });

    if (verifyBenefitHistory) {
        // remove benefit id from pursuedBenefit model
        await User.findOneAndUpdate(
          { _id: data.userId },
          {
            $pull: {
              purchasedBenefits: data.benefitId,
            },
          },
          { new: true }
        );

        // remove users details from the benefit model
        await Benefit.findOneAndUpdate(
          { _id: data.benefitId },
          {
            $pull: {
              users: data.userId,
              purchasedUsers: { userId: data.userId },
            },
          },
          { new: true }
        );

      const updatedData = await BenefitHistory.findOneAndUpdate(
        { _id: req.params.benefitHistoryId },
        { $set: { current: false } },
        { new: true }
      );

      res.json({
        message: "User successfully removed",
        success: true,
        updated: updatedData,
      });
    } else {
      return res.json({ message: "Benefit history not found", success: false });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to remove user",
      success: false,
    });
  }
};
