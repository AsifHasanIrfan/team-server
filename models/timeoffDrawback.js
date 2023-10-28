// external imports
const mongoose = require("mongoose");
 
// task Schema
const timeOffDrawbackSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Please enter time off type"],
    },
    reason: {
      type: String,
      required: [true, "Please enter reason"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter amount"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// task model
const timeOffDrawback = mongoose.model("TimeOffDrawback", timeOffDrawbackSchema);
module.exports = timeOffDrawback;
