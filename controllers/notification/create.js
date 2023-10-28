// internal import
const Notification = require("../../models/notification");

module.exports = async (req, res) => {
  try {

        const notification = new Notification(req.body)
        await notification.save()
        res.json({ notification, success: true });
    
    } catch (error) {
        res.json({ error: error.message, message: "Failed to send notification", success: false });
    }
};
