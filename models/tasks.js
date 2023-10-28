// external imports
const mongoose = require("mongoose");

// task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
    },

    description: {
      type: String,
      default: "",
    },

    revision_description: {
      type: String,
      default: "",
    },

    blocked_description: {
      type: String,
      default: "",
    },

    latetask_description: {
      type: String,
      default: "",
    },

    dueDateAndTime: {
      type: String,
      required: [true, "Please enter due date and time"],
    },

    status: {
      type: String,
      enum: [
        "In Progress",
        "Completed",
        "Assinged",
        "Completed Late",
        "Approved",
        "Approved Late",
        "In Revision",
        "Blocked",
      ],
      default: "In Progress",
    },
    submissionDate: {
      type: String,
    },

    attachments: {
      type: Array,
    },

    dgCoin: {
      type: Number,
    },
    receiveDgCoin: {
      type: Number,
      default: 0, 
    },

    inRevisionCount: {
      type: Number,
      default: 0,
    },

    worker: { type: Object },

    updateTime: { type: String },
  },
  { timestamps: true }
);

// task model
const task = mongoose.model("Task", taskSchema);
module.exports = task;
