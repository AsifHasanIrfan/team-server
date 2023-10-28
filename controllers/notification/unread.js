// internal import
const Notification = require("../../models/notification");

module.exports = async (req, res) => {
  try {

        await Notification.findOneAndUpdate({ _id : req.params.id }, { isRead: false })
        res.json({ message: "notification marked as unread", success: true });

    } catch (error) {
        res.json({ error: error.message, message: "Failed to unread notification", success: false });
    }
};
