// external imports
const mongoose = require("mongoose");

// task Schema
const assignBenefitSchema = new mongoose.Schema({
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        benefit: {
            type: mongoose.Types.ObjectId,
            ref: "Benefit"
        },
        unlockDate: {
            type: String,
            required: [true, "Please enter unlock date"],
        },
        isUnlocked: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true });

// benefit model
const assignBenefit = mongoose.model("AssignBenefit", assignBenefitSchema);
module.exports = assignBenefit;
