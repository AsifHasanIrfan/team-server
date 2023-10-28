// external imports
const mongoose = require("mongoose");

// Attendance Schema
const AttendanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    isPresent: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Attendance model
const attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = attendance;
