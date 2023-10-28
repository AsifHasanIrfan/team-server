// internal import
const TimeOff = require("../../../models/timeOff");
const User = require("../../../models/users");

module.exports = async (req, res) => {
    try {
        const { status, totalDays } = req.body;

        // query
        const verifyTimeOff = await TimeOff.findOne({ _id: req.params.timeOffId });
        const findUser = await User.findOne({ _id: verifyTimeOff.user });

        // total partial timeoff req
        const totalMinInPartialTimeoff = (verifyTimeOff.partialHour * 60) + verifyTimeOff.partialMin;
        const totalRequestTimeoffMinDaysMins = (totalDays * 8) * 60;

        // verify timeoff data
        if (!verifyTimeOff) return res.json({ message: "Time off not found", success: false });

        // for days timeoff system
        if ((status === 'approved' && verifyTimeOff.type === 'Vacation') || (status === 'approved' && verifyTimeOff.type === 'Sick day')) {
            // checking is available timeoff have enough
            if (findUser.timeOffInMins.totalMinsAvailable < totalRequestTimeoffMinDaysMins) {
                return res.send({ message: `${findUser.firstName} dont have enough timeoff!`, success: false });
            }

            // updating
            await User.findOneAndUpdate({ _id: verifyTimeOff.user }, {
                timeOffInMins: {
                    totalMinsAvailable: findUser.timeOffInMins.totalMinsAvailable - totalRequestTimeoffMinDaysMins,
                    totalMinsTaken: findUser.timeOffInMins.totalMinsTaken + totalRequestTimeoffMinDaysMins,
                }
            }, { new: true });
        }

        // for partial mins timeoff system
        if (status === 'approved' && verifyTimeOff.type === 'Partial Timeoff') {
            // checking is available timeoff have enough
            if (findUser.timeOffInMins.totalMinsAvailable < totalMinInPartialTimeoff) {
                return res.send({ message: `${findUser.firstName} dont have enough timeoff!`, success: false });
            }

            // updating
            await User.findOneAndUpdate({ _id: verifyTimeOff.user }, {
                timeOffInMins: {
                    totalMinsAvailable: findUser.timeOffInMins.totalMinsAvailable - totalMinInPartialTimeoff,
                    totalMinsTaken: findUser.timeOffInMins.totalMinsTaken + totalMinInPartialTimeoff,
                }
            }, { new: true });
        }

        // console.log(verifyTimeOff)

        // for partial mins timeoff system
        if (status === 'approved' && verifyTimeOff.type === 'Change Off Day') {
            // checking is available timeoff have enough
            await User.findOneAndUpdate({ _id: verifyTimeOff.user },
                { 
                    weeklyOffday: verifyTimeOff.day 
                },{ new: true });
        }

        // update timeoff data
        const updatedData = await TimeOff.findOneAndUpdate({ _id: req.params.timeOffId },
            { status: status }
        );

        res.json({ message: "Time off successfully updated", success: true, updated: updatedData });
    } catch (error) {
        console.log(error.message)
        res.json({ error: error.message, message: "Failed to update time off", success: false });
    }
};
