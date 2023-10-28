// external imports
const mongoose = require('mongoose')

// notification schema 
const notificationSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    recipients: [mongoose.Types.ObjectId],
    url: String,
    content: String,
    isRead: {type: Boolean, default: false},
    isAdmin : {type: Boolean, default: false},
    isArchived : {type: Boolean, default: false}
}, {
    timestamps: true
})

// notification model
module.exports = mongoose.model('Notification', notificationSchema)