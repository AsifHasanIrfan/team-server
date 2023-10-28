// external imports
const mongoose = require("mongoose");

// task Schema
const foregetPasswordRequestchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter title"],
    },

    username: {
      type: String,
      required: [true, "Please enter title"],
    },

    status: {
      type: String,
      enum: ["progress", "decline", "approved"],
      default: "progress",
    },
  },
  { timestamps: true }
);

// task model
const ForgetPasswordRequest = mongoose.model("Forget-Request", foregetPasswordRequestchema);
module.exports = ForgetPasswordRequest;
