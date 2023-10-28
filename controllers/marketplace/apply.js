// internal import
const Marketplace = require("../../models/marketplace");
const MarketplaceApply = require("../../models/marketplaceApply");
const User = require("../../models/users");

module.exports = async (req, res) => {

  const projectId = req.params.id;

  try {
    const { appliedWithDGCoin, biddingAmount, isDgTeamWillHandle, user } = req.body;

    // calculating total dg cost
    let totalCostofDgCoin = appliedWithDGCoin + biddingAmount;

    if (isDgTeamWillHandle) { totalCostofDgCoin = totalCostofDgCoin + 500 }

    const verifyProject = await Marketplace.findOne({ _id: projectId });
    const findUser = await User.findOne({ _id: user });

    if (!verifyProject) return res.json({ message: "Project not found", success: false });
    if (!findUser) return res.json({ message: "User not found", success: false });

    // checking is appplication deadline passed
    if (new Date(verifyProject.expiredDate) < new Date().setHours(0, 0, 0, 0)) {
      return res.json({ message: "Time expired already!", success: false });
    }

    if (findUser.dgCoin < totalCostofDgCoin) return res.json({ message: `You dont't have enough dg coin!`, success: false });

    const marketplaceApply = new MarketplaceApply({ ...req.body, marketplaceId: projectId });
    const result = await marketplaceApply.save();

    if (result._id) {

      // deduct dgcoin from user
      await User.findOneAndUpdate({ _id: user }, {
        dgCoin: parseFloat(findUser.dgCoin) - parseFloat(totalCostofDgCoin)
      }, { new: true });

      // pushing applied user id to marketplace schema
      await Marketplace.findOneAndUpdate({ _id: projectId }, {
        $push: { appliedUsers: user },
      }, { new: true });

      // pushing applied job id to user schema
      await User.findOneAndUpdate({ _id: user }, {
        $push: { appliedMarketplaceJobs: result._id },
      }, { new: true });
    }

    res.json({
      message: "Porject submitted successfully",
      success: true,
    });

  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to submit project",
      success: false,
    });
  }
};