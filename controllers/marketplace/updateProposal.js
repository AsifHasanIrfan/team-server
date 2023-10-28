// internal import
const Marketplace = require("../../models/marketplace");
const MarketplaceApply = require("../../models/marketplaceApply");
const User = require("../../models/users");

module.exports = async (req, res) => {

    try {
      // verify proposal
      const verifyProposal = await MarketplaceApply.findOne({
        _id: req.params.proposalId,
      });
      const findUser = await User.findOne({ _id: verifyProposal.user });
      if (!verifyProposal)
        return res.json({
          message: "Invalid proposal request!",
          success: false,
        });

      if (findUser.dgCoin < parseFloat(req.body.biddingAmount))
        return res.json({
          message: `You dont't have enough dg coin!`,
          success: false,
        });

      // prepare data to updaye
      const data = {
        biddingAmount:
          verifyProposal.biddingAmount + parseFloat(req.body.biddingAmount),
        whyPerfect: req.body.whyPerfect,
        paymentMethod: req.body.paymentMethod,
        paymentURL: req.body.paymentURL,
        paymentURL: req.body.paymentURL,
        paymentNumber: req.body.paymentNumber,
        attachments: req.body.attachments,
      };

      // updating
      const updatedData = await MarketplaceApply.findOneAndUpdate(
        { _id: req.params.proposalId },
        data
      );

      // deduct dgcoin from user
      await User.findOneAndUpdate(
        { _id: verifyProposal.user },
        {
          dgCoin:
            parseFloat(findUser.dgCoin) - parseFloat(req.body.biddingAmount),
        },
        { new: true }
      );

      res.json({
        message: "Proposal Updated Successfully!",
        success: true,
        updated: updatedData,
      });
    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to update proposal",
            success: false,
        });
    }
};