// internal import
const Notification = require("../../models/notification");

module.exports = async (req, res) => {
  try {
        await Notification.findOneAndUpdate({ _id: req.params.id }, { isArchived : true })

        res.json({ message: "Notification archived", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to archived notification", success: false });
    }
};
