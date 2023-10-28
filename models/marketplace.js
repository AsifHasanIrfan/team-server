// external imports
const mongoose = require("mongoose");

// task Schema
const marketPlaceSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    description: {
      type: String,
      required: [true, "Please enter descrption"],
    },
    category: {
        type: String,
        enum: {
            values: ['all', 'uiux', 'react', 'fullstack', 'graphic', 'social', 'other', 'wordpress'],
            message: "Status value can not be {VALUE}, must be all/uiux/react/fullstack/graphic/social/other/wordpress"
        },
        required: [true, "Please enter project category"],
    },
    length: {
      type: String,
      required: [true, "Please enter project length"],
    },
    expiredDate: {
      type: String,
      required: [true, "Please enter expired date"],
    },
    costOfCoin: {
      type: Number,
      required: [true, "Please enter cost of dg coin"],
    },
    budget: {
      type: Number,
      required: [true, "Please enter project budget"],
    },
    view: Number,
    attachments: {
      type: Array,
    },
    status: {
      type: String,
      enum: {
        values: ["posted", "running", "completed", "cancelled", "archived"],
        message:
          "Status value can not be {VALUE}, must be posted/running/completed/cancelled/archived",
      },
      default: "posted",
    },
    appliedUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    assignedUser: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      }
  },
  { timestamps: true });

// benefit model
const marketPlace = mongoose.model("Marketplace", marketPlaceSchema);
module.exports = marketPlace;