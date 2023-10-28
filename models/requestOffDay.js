// external imports
const mongoose = require("mongoose");

// task Schema
const reqOffDaySchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["progress", "decline", "approved"],
            default: "progress",
        },

        date: {
            type: String,
            required: [true, "Please enter date"],
        },

        day: {
            type: String,
            enum: {
                values: [
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Null",
                ],
                message: "Status value can not be {VALUE}, must be Saturday/Sunday/Monday/Tuesday/Wednesday/Thursday/Friday/Null"
            },
            default: "Null",
        },

        user: { type: mongoose.Types.ObjectId, ref: "User" },

    },
    { timestamps: true }
);

// task model
const requestOffDay = mongoose.model("OffDayRequest", reqOffDaySchema);
module.exports = requestOffDay;
