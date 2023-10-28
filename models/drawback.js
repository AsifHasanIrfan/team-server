// external imports
const mongoose = require("mongoose");

// drawBackModel Schema
const drawBackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: {
        values: ["by-coin", "by-dollar"],
        message:
          "Status value can not be {VALUE}, must be by-coin/by-dollar",
      },
      required: [true, "Please enter drawback type!"],
    },
    value: {
      type: String,
      enum: [
        "late-meeting",
        "missed-day",
        "no-work",
        "leave-early",
        "not-completed-in-time",
        "others",
      ],
      required: [true, "Please enter drawback value!"],
    },
    title: {
      type: String,
    },
    reason: {
      type: String,
      required: [true, "Please enter reason!"],
    },
    drawback: {
      type: String,
      default: 0,
      required: [true, "Please enter drawback amnount!"],
    },
    attachments: {
      type: Array,
    },
  },
  { timestamps: true }
);

// Drawback model
const drawBackModel = mongoose.model("Drawback", drawBackSchema);
module.exports = drawBackModel;
