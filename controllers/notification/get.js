// internal import
const Notification = require("../../models/notification");

module.exports = async (req, res) => {
  try {
        let notification = await Notification.find({recipients: req.user._id}).sort('-createdAt')

        if(req.user.role === 'admin'){
            notification = await Notification.find({isAdmin: true}).sort('-createdAt')
        }

        res.json({ notification, message: "Successfully get notification", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to get notification", success: false });
    }
};
