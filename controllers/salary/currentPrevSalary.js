// internal import
const Salary = require("../../models/salary");
const User = require("../../models/users");
const Drawback = require("../../models/drawback");
const DG = require("../../models/dg");
const Achievement = require("../../models/achievement");
const Payment = require("../../models/payment");

module.exports = async (req, res) => {

    // checking is that user trying to get data
    if (req.user._id.toString() !== req.params.id.toString()) {
        return res.send({ message: 'You are not authorized token!', success: false });
    }

    // current
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // variables
    // let totalThisMonthSalary = 0;
    let totalThisMonthDrawbacks = 0;
    let totalThisMonthRewards = 0;
    let totalThisMonthAchievementRewards = 0;
    let totalThisMonthCoinDrawbacks = 0;

    try {
        const verifyUser = await User.findOne({ _id: req.params.id });
        if (!verifyUser) return res.json({ message: `User not found!`, success: false });

        // base salary
        const baseSalary = parseFloat(verifyUser.monthlyPayment);

        // queries
        const drawbacks = await Drawback.find({ user: req.params.id });
        const rewards = await DG.find({ user: req.params.id });
        const achievements = await Achievement.find({ user: req.params.id });

        // calculating this month total drawbacks

        const dollarDrawbacks = drawbacks.filter((item) => item.type === 'by-dollar');
        const coinDrawbacks = drawbacks.filter((item) => item.type === 'by-coin');


        dollarDrawbacks.map(item => {
            // this month total drawback
            if ((new Date(item.createdAt).getMonth() + 1) + '-' + new Date(item.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                totalThisMonthDrawbacks = totalThisMonthDrawbacks + parseFloat(item.drawback);
            }
        })

        coinDrawbacks.map(item => {
            // this month total drawback
            if ((new Date(item.createdAt).getMonth() + 1) + '-' + new Date(item.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                totalThisMonthCoinDrawbacks = totalThisMonthCoinDrawbacks + parseFloat(item.drawback);
            }
        })

        // calculating this month total rewards
        rewards.map(item => {
            if ((new Date(item.createdAt).getMonth() + 1) + '-' + new Date(item.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                totalThisMonthRewards = totalThisMonthRewards + parseFloat(item.amount);
            }
        })

        // calculating this month total achievements rewards
        achievements.map(item => {
            //  this month total achievements rewards
            if ((new Date(item.date).getMonth() + 1) + '-' + new Date(item.date).getFullYear() === (currentMonth + '-' + currentYear)) {
                totalThisMonthAchievementRewards = totalThisMonthAchievementRewards + parseFloat(item.amount);
            }
        })

        // calculation
        const totalThisMonthSalary = ((baseSalary + totalThisMonthAchievementRewards) - totalThisMonthDrawbacks)

        res.json({
            datas: {
                totalThisMonthSalary,
                totalThisMonthDrawbacks,
                totalThisMonthRewards: totalThisMonthRewards - totalThisMonthCoinDrawbacks,
                totalThisMonthAchievementRewards,
            },
            message: "Successfully get all data",
            success: true,
        });


    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to get salary information",
            success: false,
        });
    }
};
