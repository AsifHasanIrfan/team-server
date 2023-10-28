// external imports
const mongoose = require("mongoose");

// MarketplaceApply Schema
const marketPlaceApplySchema = new mongoose.Schema(
  {
    marketplaceId: {
      type: mongoose.Types.ObjectId,
      ref: "Marketplace",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    biddingAmount: {
      type: Number,
      required: [true, "Please enter bidding amount"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please enter payment method"],
    },
    paymentURL: {
      type: String,
    },
    paymentNumber: {
      type: String,
    },
    whyPerfect: {
      type: String,
      required: [true, "Please enter why perfect for this job"],
    },
    isDgTeamWillHandle: {
        type: Boolean, 
        default: false,
    },
    attachments: Array,
    status: {
      type: String,
      enum: {
        values: ["approved", "completed", "cancelled", "blocked"],
        message:
          "Status value can not be {VALUE}, must be approve/completed/cancelled/blocked",
      }
    },
  },
  { timestamps: true }
);

// MarketplaceApply model
const marketPlaceApply = mongoose.model("MarketplaceApply", marketPlaceApplySchema);
module.exports = marketPlaceApply;

