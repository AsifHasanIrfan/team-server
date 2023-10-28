// external imports
const mongoose = require("mongoose");

// salary Schema
const salarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: String,
      required: [true, "Please enter start date"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter salary amount"],
    },
    status: {
      type: String,
      enum: ["processing", "paid", "cancel"],
      default: "processing",
    },
  },
  { timestamps: true }
);

// salary model
const salary = mongoose.model("Salary", salarySchema);
module.exports = salary;
