// external imports
const mongoose = require("mongoose");

// purchaseTimeoff Schema
const purchaseTimeoffSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    type: {
      type: String,
      default: "",
    },
    days: {
        type: Number,
        default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// purchaseTimeoff model
const purchaseTimeoff = mongoose.model("PurchaseTimeoff", purchaseTimeoffSchema);
module.exports = purchaseTimeoff;