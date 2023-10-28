// internal import
const Benefit = require("../../models/benefit");
const User = require("../../models/users");
const BenefitHistory = require("../../models/benefitHistory");

module.exports = async (req, res) => {
  
  try {
    const data = req.body;
    
    const verifyBenefit = await Benefit.findOne({ _id: data.benefitId });

    const verifyUser = await User.findOne({ _id: data.userId });
    if(verifyUser.purchasedBenefits.includes(data.benefitId)) {
      res.json({
        message: "You have already purchased this benefit!",
        success: false,
      });
    } else {
      if (verifyUser.dgCoin > verifyBenefit.dgCost) {
        const availableDgCoin = verifyUser.dgCoin - data.unlockCost;

        await User.findOneAndUpdate(
          { _id: data.userId },
          {
            $push: { purchasedBenefits: data.benefitId },
            $set: { dgCoin: availableDgCoin },
          }
        );

        await Benefit.findOneAndUpdate(
          { _id: data.benefitId },
          {
            $push: {
              purchasedUsers: {
                userId: data.userId,
                purchasedDate: new Date(),
              },
            },
          }
        );

        const benefitHistoryData = {
          username: verifyUser.username,
          benefitTitle: verifyBenefit.title,
          userId: verifyUser._id,
          benefitId: verifyBenefit._id
        };

        const benefitHistory = new BenefitHistory(benefitHistoryData);
        await benefitHistory.save();

        res.json({
          message: "Benefit purchased successfully",
          success: true,
        });
      } else {
        return res.json({
          message: "You don't have enough dgCoin",
          success: false,
        });
      }
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to update benefit",
      success: false,
    });
  }
};
