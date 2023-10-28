// internal import
const User = require("../../../models/users");
const PurchaseTimeoff = require("../../../models/purchaseTimeoff");

module.exports = async (req, res) => {
    try {

        // calculate total days in min
        const totalHoursPurchased = (req.body.purchasedDays * 8) * 60;

        // finding user
        const verifyUser = await User.findOne({ _id: req.params.id });

        // checking is user valid
        if (!verifyUser) return res.json({ message: "User Not Found!", success: false });

        // checking is that user trying to get data
        if (req.user._id.toString() !== req.params.id.toString()) {
            return res.send({ message: 'You are not authorized token!', success: false });
        }

        // checking is that user trying to get data
        if (req.body.purchasedDays < 1) {
            return res.send({ message: 'You have to buy more than zero!', success: false });
        }

        // checking is user have access
        if (verifyUser.workingAs === 'Intern' || verifyUser.workingAs === 'Trial Member' || verifyUser.isArchived) {
            return res.send({ message: 'You dont have access to this!', success: false });
        }

        // checking is enough dg coin user have
        if (verifyUser.dgCoin < req.body.totalCost) return res.json({ message: "You have not enough DG Coin!", success: false });

        // updating
        await User.findOneAndUpdate({ _id: req.params.id }, {
            dgCoin: parseFloat(verifyUser.dgCoin) - parseFloat(req.body.totalCost),
            timeOffInMins: {
                ...verifyUser.timeOffInMins,
                totalMinsAvailable: verifyUser.timeOffInMins.totalMinsAvailable + totalHoursPurchased,
            }
        }, {new: true})

        // saaving data 
        const pruchaseTimeOff = new PurchaseTimeoff({
            user: req.params.id,
            type: req.body.type,
            days: parseInt(req.body.purchasedDays),
            cost: parseFloat(req.body.totalCost),
        });
        const result = await pruchaseTimeOff.save();

        // if data created push to user model
        if (result._id) {
            await User.findOneAndUpdate({ _id: req.params.id }, {
                $push: { purchasedTimeoffs: result._id },
            }, { new: true });
        }

        res.json({
            message: `Purchased Timeoff Days Successfully!`,
            success: true,
        });

    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to update timeoff day!",
            success: false,
        });
    }
};
