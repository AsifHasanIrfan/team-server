// internal import
const Notification = require("../../models/notification");

module.exports = async (req, res) => {
  try {
        if(req.user.role === 'admin'){
            await Notification.updateMany({ role : "admin" }, { isRead : false })
        }else{
            await Notification.updateMany({ recipients : { $in : [req.user._id] } }, { isRead : false })
        }

        res.json({ message: "All notification marked as unread", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to Unread all notification", success: false });
    }
};
