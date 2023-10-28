// external imports
const mongoose = require("mongoose");
 
// task Schema
const timeOffSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Please enter time off type"],
    },
    startDate: {
      type: String,
      required: [true, "Please enter start date"],
    },
    endDate: {
      type: String,
    }, 
    lateTime: {
      type: String,
    },
    partialStartTime: {
      type: String,
      default: "",
    },
    partialEndTime: {
      type: String,
      default: "",
    },
    partialHour: {
      type: Number,
      default: 0,
    },
    partialMin: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please enter reason"],
    },
    status: {
      type: String,
      enum: ["progress", "decline", "approved"],
      default: "progress",
    },
    costType: {
      type: String,
      enum: ["paid", "dg", "unpaid"],
      default: "unpaid",
    },
    day: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// task model
const timeOff = mongoose.model("TimeOff", timeOffSchema);
module.exports = timeOff;
