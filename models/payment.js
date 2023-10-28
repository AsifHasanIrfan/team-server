// external imports
const mongoose = require("mongoose");

// payMent Schema
const paymentSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    salary: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// payMent model
const payMent = mongoose.model("Payment", paymentSchema);
module.exports = payMent;
