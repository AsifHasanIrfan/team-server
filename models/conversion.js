// external imports
const mongoose = require("mongoose");

// task Schema
const conversionSchema = new mongoose.Schema(
    {
        usd: {
            type: Number,
            required: [true, "Please enter usd value"],
        },
        eur: {
            type: Number,
            required: [true, "Please enter euro value"],
        },
        bdt: {
            type: Number,
            required: [true, "Please enter bdt value"],
        },
        inr: {
            type: Number,
            required: [true, "Please enter inr value"],
        },
    },
    { timestamps: true }
);

// Conversion model
const Conversion = mongoose.model("Conversion", conversionSchema);
module.exports = Conversion;
