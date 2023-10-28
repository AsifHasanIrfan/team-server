// external imports
const mongoose = require("mongoose");

// user Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      trim: true,
      maxlength: 25,
    },
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
      trim: true,
      maxlength: 25,
    },
    lastName: {
      type: String,
      required: [true, "Please enter last name"],
      trim: true,
      maxlength: 25,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    phone: {
      type: Number,
      default: 0,
    },
    experience: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "https://cutt.ly/UAXRFXO",
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
      required: [true, "Please enter role"],
    },
    designation: {
      type: String,
      required: [true, "Please enter designation"],
    },
    workingAs: {
      type: String,
      required: [true, "Please enter Working as"],
    },
    address: {
      type: String,
      default: "",
    },
    fiverr: {
      type: String,
      default: "",
    },
    upwork: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    dgCoin: {
      type: Number,
      default: 0,
    },
    monthlyPayment: {
      type: Number,
      default: 0,
    },
    bio: String,
    isActive: {
      type: Boolean,
      default: false,
    },
    projectCompleted: {
      type: Number,
      default: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    facebook: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    dribble: {
      type: String,
      default: "",
    },
    behance: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    others: {
      type: String,
      default: "",
    },
    weeklyOffday: {
      type: String,
      default: "",
    },
    availableTimeOff: {
      sickDays: { type: Number, default: 0 },
      vacationDays: { type: Number, default: 0 },
      takenSickDays: { type: Number, default: 0 },
      takenVacationDays: { type: Number, default: 0 },
    },
    timeOffInMins: {
      totalMinsAvailable: { type: Number, default: 0 },
      totalMinsTaken: { type: Number, default: 0 },
    },
    payment: {
      name: { type: String, default: "" },
      number: { type: String, default: "" },
      country: { type: String, default: "" },
      accountName: { type: String, default: "" },
      districtName: { type: String, default: "" },
      branchName: { type: String, default: "" },
      bankName: { type: String, default: "" },
    },
    updateRequest: {
      type: Array,
    },
    dgDetails: [{ type: mongoose.Types.ObjectId, ref: "DG" }],
    payments: [{ type: mongoose.Types.ObjectId, ref: "Payment" }],
    salaries: [{ type: mongoose.Types.ObjectId, ref: "Salary" }],
    timeOff: [{ type: mongoose.Types.ObjectId, ref: "TimeOff" }],
    tasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
    drawbacks: [{ type: mongoose.Types.ObjectId, ref: "Drawback" }],
    benefits: [{ type: mongoose.Types.ObjectId, ref: "AssignBenefit" }],
    achievements: [{ type: mongoose.Types.ObjectId, ref: "Achievement" }],
    purchasedBenefits: [{ type: mongoose.Types.ObjectId, ref: "Benefit" }],
    purchasedTimeoffs: [
      { type: mongoose.Types.ObjectId, ref: "PurchaseTimeoff" },
    ],
    appliedMarketplaceJobs: [
      { type: mongoose.Types.ObjectId, ref: "Marketplace" },
    ],
    assigneddMarketplacesJobs: [
      { type: mongoose.Types.ObjectId, ref: "Marketplace" },
    ],
    reports: [{ type: mongoose.Types.ObjectId, ref: "Report" }],
    attendance: [{ type: mongoose.Types.ObjectId, ref: "Attendance" }],
  },
  { timestamps: true }
);

// user model
const user = mongoose.model("User", userSchema);

module.exports = user; 