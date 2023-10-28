// external imports
const mongoose = require("mongoose");
 
// task Schema
const benefitSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    imgUrl: {
      type: String,
      required: [true, "Please enter img url"],
    },
    subDescription: {
      type: String,
      required: [true, "Please enter sub description url"],
    },
    description: {
      type: String,
      required: [true, "Please enter description url"],
    },
    dgCost: {
      type: Number,
      required: [true, "Please enter cost of dg coin"],
    },
    purchasedUsers: {
      type: [
        {
          userId: { type: mongoose.Types.ObjectId, ref: "User" },
          purchasedDate: Date,
        }
      ]
    },
    isArchived: {
      type: Boolean,
      default: true
    },
    users: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "User" 
    }],
  },{ timestamps: true });

// benefit model
const benefit = mongoose.model("Benefit", benefitSchema);
module.exports = benefit;