// external imports
const mongoose = require("mongoose");
 
// task Schema
const dgSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter amount of dg coin"],
    },
    isCountForEMP: {
      type: Boolean,
      required: [true, "Please enter amount of dg coin"],
    },
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: "User" 
    },
  },{ timestamps: true });

// benefit model
const dg = mongoose.model("DG", dgSchema);
module.exports = dg;
