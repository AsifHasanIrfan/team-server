// external imports
const mongoose = require("mongoose");

// Benefit History Schema
const benefitHistorySchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    benefitTitle: {
      type: String,
    },
    current: {
      type: Boolean,
      default: true,
    },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    benefitId: { type: mongoose.Types.ObjectId, ref: "Benefit" },
  },
  { timestamps: true }
);

// benefit history model
const benefitHistory = mongoose.model("BenefitHistory", benefitHistorySchema);
module.exports = benefitHistory;
