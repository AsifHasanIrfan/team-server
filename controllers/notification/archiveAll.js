// internal import
const Notification = require("../../models/notification");

module.exports = async (req, res) => {
  try {
        if(req.user.role === 'admin'){
            await Notification.updateMany({ role : "admin" }, { isArchived : false })
        }else{
            await Notification.updateMany({ recipients : { $in : [req.user._id] } }, { isArchived : true })
        }

        res.json({ message: "All notification have been archived", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to read all notification", success: false });
    }
};
