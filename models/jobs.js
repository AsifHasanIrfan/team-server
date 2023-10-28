// external imports
const mongoose = require("mongoose");

// salary Schema
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title"],
    },
    openPostiton: {
        type: Number,
        required: [true, "Please enter how much person need"],
    },
    jobPlaceType: {
        type: String,
        enum: {
            values: ["remote", "on-site", "hybrid"],
            message: "status value can not be {VALUE}, must be remote/on-site/hybrid"
        },
        default: "remote"
    },
    category: {
        type: String,
        enum: {
            values: ["designer", "developer", "marketing", 'virtual assistant', 'project manager', 'internship'],
            message: "Category value can not be {VALUE}, must be designer/developer/marketing/virtual-assistant/project-manager/internship"
        },
        required: [true, "Please enter category amount"],
    },
    status: {
        type: String,
        enum: {
            values: ["active", "inactive"],
            message: "status value can not be {VALUE}, must be active/inactive"
        },
        default: "active"
    },
    applicantId: [{
        type: mongoose.Types.ObjectId,
        ref: "Apply",
    }],
}, { timestamps: true }
);

// salary model
const job = mongoose.model("Job", jobSchema);
module.exports = job;
