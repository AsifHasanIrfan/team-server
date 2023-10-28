// internal import
const Notification = require("../../models/notification");

module.exports = async (req, res) => {
    try {
        if(req.user.role === 'admin'){
            await Notification.updateMany({ role : "admin" }, { isRead : true })
        }else{
            await Notification.updateMany({ recipients : { $in : [req.user._id] }}, { isRead : true })
        }

        res.json({ message: "All notificatin marked as read", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to read all notification", success: false });
    }
};
