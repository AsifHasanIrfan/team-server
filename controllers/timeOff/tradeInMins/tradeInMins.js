// internal import
const User = require("../../../models/users");

module.exports = async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.params.id });

        // calculate total days in min
        const totalTradeMins = (req.body.totalTradeDays * 8) * 60;

        // checking is user valid
        if (!findUser) return res.json({ message: "User Not Found!", success: false });

        // checking is that user trying to get data
        if (req.user._id.toString() !== req.params.id.toString()) {
            return res.send({ message: 'You are not authorized token!', success: false });
        }

        // checking is user have access
        if (findUser.workingAs === 'Intern' || findUser.workingAs === 'Trial Member' || findUser.isArchived) {
            return res.send({ message: 'You dont have access to this!', success: false });
        }

        // checking is that user trying to get data
        if (req.body.totalTradeDays < 1) {
            return res.send({ message: 'You have to trade more than zero!', success: false });
        }

        // checking is enough time available
        if (findUser.timeOffInMins.totalMinsAvailable < totalTradeMins) return res.send({ message: 'You do not have enough timeoff days left!', success: false });

        // updating
        await User.findOneAndUpdate({ _id: req.params.id }, {
            dgCoin: parseFloat(findUser.dgCoin) + parseFloat(req.body.totalTradeCoin),
            timeOffInMins: {
                ...findUser.timeOffInMins,
                totalMinsAvailable: findUser.timeOffInMins.totalMinsAvailable - totalTradeMins,
            }
        }, { new: true });

        res.json({ message: "Vacation Days Traded Successfully!", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to trade time off", success: false });
    }
};
