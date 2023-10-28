// internal import
const User = require("../../models/users");
const TimeoffDrawback = require("../../models/timeoffDrawback");

module.exports = async (req, res) => {
    try {

        // finding user
        const findUser = await User.findOne({ _id: req.params.id });

        // number in days
        const days = parseInt(req.body.days);
        const type = req.body.type;

        // checking is user valid
        if (!findUser) return res.json({ message: "User Not Found!", success: false });
    


        // checking is days amount zero
        if (days === 0 || type === '' || req.body.reason === '') return res.json({ message: "Please enter all data!", success: false });
        if (days < 0) return res.json({ message: "Please input valid days!", success: false });


        let totalMins = 0;

        // getting total days to mins
        if (type === 'by-day') {
            totalMins = (days * 8) * 60;
        }

        // getting total hours to mins
        if (type === 'by-hour') {
            totalMins = days * 60;
        }

        // getting total mins to main variable
        if (type === 'by-min') {
            totalMins = days;
        }

        // checking user have available time
        if (findUser.timeOffInMins.totalMinsAvailable < totalMins) return res.json({ message: "User have not enough available!", success: false });

        // saving the data
        const timeOffDrawback = new TimeoffDrawback({
            user: req.params.id,
            type: type,
            reason: req.body.reason,
            amount: totalMins
        });
        await timeOffDrawback.save();

        // update
        await User.findOneAndUpdate({ _id: req.params.id }, {
            timeOffInMins: {
                totalMinsAvailable: findUser.timeOffInMins.totalMinsAvailable - totalMins,
                totalMinsTaken: findUser.timeOffInMins.totalMinsTaken + totalMins
            }
        }, { new: true });

        res.json({
            message: "Successfully updated user timeoff!",
            success: true
        });

    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to create time off update!",
            success: false
        });
    }
};

