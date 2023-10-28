// external imports 
const mongoose = require('mongoose')

// Event Schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
    },

    users: [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }],

    date: {
        type: String,
        required: [true, 'Please enter date'],
    },
    
    startTime: {
        type: String,
        required: [true, 'Please enter start date'],
    },

    endTime: {
        type: String,
        required: [true, 'Please enter end time'],
    }
}, { timestamps: true })


// Event model
const event = mongoose.model("Event", eventSchema)
module.exports = event