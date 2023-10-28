// external imports
const mongoose = require("mongoose");

// report Schema
const reportSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        member: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        subject: {
            type: String,
            required: [true, "Please enter subject"],
        },
        description: {
            type: String,
            required: [true, "Please enter description"],
        },
        attachments: {
            type: Array,
        },
    },
    { timestamps: true }
);

// report model
const report = mongoose.model("Report", reportSchema);
module.exports = report;
