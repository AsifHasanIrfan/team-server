// external imports
const mongoose = require("mongoose");

// RequestLogin Schema
const requestLoginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    requestedBy: {
      type: String,
      required: [true, "Please enter requested by"],
    },
    status: {
      type: String,
      enum: {
        values: ["progress", "decline", "approved"],
        message:
          "Status value can not be {VALUE}, must be progress/decline/approved",
      },
      default: "progress",
    },
  }, { timestamps: true });

// RequestLogin model
const requestLogin = mongoose.model("RequestLogin", requestLoginSchema);
module.exports = requestLogin;
