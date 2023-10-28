// external imports
const mongoose = require("mongoose");

// task Schema
const achievementSchema = new mongoose.Schema({
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: [true, "Please enter title"],
        },
        amount: {
            type: Number,
            required: [true, "Please enter amount"],
        },
        imgUrl: {
            type: String,
            required: [true, "Please enter image url"],
        },
        date: {
            type: String,
            required: [true, "Please enter date"],
        }
    }, { timestamps: true });

// benefit model
const achievement = mongoose.model("Achievement", achievementSchema);
module.exports = achievement;
