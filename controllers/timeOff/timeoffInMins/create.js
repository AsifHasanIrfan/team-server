// internal import
const TimeOff = require("../../../models/timeOff");
const User = require("../../../models/users");

module.exports = async (req, res) => {
    try {

        // finding user
        const findUser = await User.findOne({ _id: req.body.user });

        // avilable days calculation
        const availableMins = findUser.timeOffInMins.totalMinsAvailable ? findUser.timeOffInMins.totalMinsAvailable : 0;
        const totalDaysAvailable = Math.floor((availableMins / 60) / 8);
        const totalHoursAvailable = Math.floor((availableMins - ((totalDaysAvailable * 8) * 60)) / 60);
        const totalMinsAvailable = availableMins - ((totalDaysAvailable * 8) * 60) - (totalHoursAvailable * 60);

        // total partial timeoff req
        const totalMinInPartialTimeoff = (req.body.partialHour * 60) + req.body.partialMin;

        // checking is user have access
        if (findUser?.workingAs === 'Intern' || findUser?.workingAs === 'Trial Member' || findUser?.isArchived) {
            return res.send({ message: 'You dont have access to this!', success: false });
        }

        if (req.body.type === 'Sick day' || req.body.type === 'Vacation') {
            if (totalDaysAvailable < req.body.totalDays) {
                return res.send({ message: 'You dont have enough timeoff!', success: false });
            }
        }

        if (req.body.type === 'Partial Timeoff') {

            // checking partial timeoff
            if (totalMinInPartialTimeoff > 480 || totalMinInPartialTimeoff < 1) {
                return res.send({ message: `Can't take more than 480 min timeoff!`, success: false });
            }

            // checking is available timeoff have enough
            if (findUser.timeOffInMins.totalMinsAvailable < totalMinInPartialTimeoff) {
                return res.send({ message: 'You dont have enough timeoff!', success: false });
            }
        }

        if(req.body.type === 'Change Off Day'){
            const findOffDayReq = await TimeOff.findOne({ user: req.body.user, type: 'Change Off Day', status: 'progress' });
            if(findOffDayReq) return res.send({ message: 'You already have an request!', success: false });
         }

        // saving data
        const timeOff = new TimeOff(req.body);
        const result = await timeOff.save();

        // if data saved push to users
        if (result._id) {
            await User.findOneAndUpdate({ _id: req.body.user }, {
                $push: { timeOff: timeOff._id },
            }, { new: true });
        }

        res.json({
            datas: { ...timeOff._doc, user: req.user },
            message: "Successfully request submitted",
            success: true
        });

    } catch (error) {
        console.log(error.message)
        res.json({
            error: error.message,
            message: "Failed to create time off request!",
            success: false
        });
    }
};

