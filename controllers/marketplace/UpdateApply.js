// internal import
const Marketplace = require("../../models/marketplace");
const MarketplaceApply = require("../../models/marketplaceApply");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const data = req.body;

    const verifyProposal = await MarketplaceApply.find({
      _id: req.params.proposalId,
    });

    if (verifyProposal) {
      await MarketplaceApply.findOneAndUpdate(
        { _id: req.params.proposalId },
        { status: data.status },
        { new: true }
      );

      if(data.status === 'approved') {
        await Marketplace.findOneAndUpdate(
          { _id: data.marketplaceId },
          { status: "running", assignedUser: data.userId },
          { new: true }
        );

        // pushing applied job id to user schema
      await User.findOneAndUpdate(
        { _id: data.userId },
        {
          $push: { assigneddMarketplacesJobs: req.params.proposalId },
        },
        { new: true }
      );
      }

      res.json({
        message: "Proposal successfully assigned",
        success: true,
      });
    } else {
      return res.json({ message: "Proposal not found", success: false });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to assigned proposal",
      success: false,
    });
  }
};