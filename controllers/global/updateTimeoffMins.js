// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
    try {

        const totalMins = (req.body.days * 8) * 60;

        // awaiting
        await User.updateMany({ role: 'employee' }, { 
            "$inc" : { "timeOffInMins.totalMinsAvailable" : totalMins }
        }) 

        res.json({ message: "All Employee Timeoff Updated!", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to update timeoff!", success: false });
    }
};
