// internal import
const Notification = require("../../models/notification");

module.exports = async (req, res) => {
  try {
        await Notification.findOneAndUpdate({_id: req.params.id},{
          isRead: true
        })
        
        res.json({ message: "Notification marked as read", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to update notification", success: false });
    }
};
