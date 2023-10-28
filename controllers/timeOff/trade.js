// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
    try {
        // const { status, totalDays } = req.body;
        const findUser = await User.findOne({ _id: req.params.id });

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

        if (findUser.availableTimeOff.vacationDays < req.body.totalTradeDays) return res.status(200).send({ message: 'You do not have enough vacation days left!', success: false });

        // data to send
        const data = {
            ...findUser.availableTimeOff,
            vacationDays: (findUser.availableTimeOff.vacationDays - req.body.totalTradeDays),
        }

        // updating
        await User.findOneAndUpdate({ _id: req.params.id }, {
            dgCoin: parseFloat(findUser.dgCoin) + parseFloat(req.body.totalTradeCoin),
            availableTimeOff: data
        }, { new: true });

        res.json({ message: "Vacation Days Traded Successfully!", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to trade time off", success: false });
    }
};
