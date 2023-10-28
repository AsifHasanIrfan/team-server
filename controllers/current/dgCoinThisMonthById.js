// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {

    // if not this mail can not access this api
    if(req.user.email !== 'asifhasanirfan@gmail.com'){
        return res.send({ message: 'You are not authorized!', success: false });
    }

    // current
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    let emps = [];

    try {
        // users
        const user = await User.findOne({ _id: req.params.id })
            .populate('drawbacks purchasedTimeoffs tasks dgDetails purchasedBenefits', 'amount dgCost drawback cost type -_id createdAt date dgCoin updateTime status purchasedUsers isArchived updateTime receiveDgCoin status')
            .select("username drawbacks purchasedBenefits purchasedTimeoffs tasks dgDetails isArchived role workingAs firstName lastName avatar");

        // variables
        let totalTasksCoinEarn = 0;
        let totalCoinEarn = 0;
        let totalDrawbackByCoins = 0;
        let totalPurchasedTimeoffByCoins = 0;
        let totalPurchasedBenfitsByCoins = 0;


        /* ============================    total get calculate for this month  ======================================== */

        // gifted dg coins calculated
        user.dgDetails.map((dg) => {
            if ((new Date(dg.createdAt).getMonth() + 1) + '-' + new Date(dg.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                totalCoinEarn = totalCoinEarn + parseFloat(dg.amount)
            }
        })

        // task approved dg coins calculated
        user.tasks.map((task) => {
            if ((task.status === 'Approved' || task.status === 'Approved Late') && (new Date(task.createdAt).getMonth() + 1) + '-' + new Date(task.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                totalTasksCoinEarn = totalTasksCoinEarn + parseFloat(task.receiveDgCoin)
            } else {
                totalTasksCoinEarn = totalTasksCoinEarn + 0
            }
        })
        /* ============================    total get calculate for this month  ======================================== */


        /* ============================    total cost calculate for this month   ======================================== */

        // filter all coins drawback and calculate total
        const byCoinDrawbacks = user.drawbacks.filter((item) => item.type === 'by-coin');
        byCoinDrawbacks.map((drawback) => {
            if ((new Date(drawback.createdAt).getMonth() + 1) + '-' + new Date(drawback.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                totalDrawbackByCoins = totalDrawbackByCoins + parseFloat(drawback.drawback)
            }
        })

        // calculate total purchased
        user.purchasedBenefits.map((purchasedBenefit) => {
            purchasedBenefit.purchasedUsers.map((purchasedUser) => {
                if (purchasedUser.userId.toString() === user._id.toString() && (new Date(purchasedUser.purchasedDate).getMonth() + 1) + '-' + new Date(purchasedUser.purchasedDate).getFullYear() === (currentMonth + '-' + currentYear)) {
                    totalPurchasedBenfitsByCoins = totalPurchasedBenfitsByCoins + parseFloat(purchasedBenefit.dgCost)
                }
            })
        })

        // calculate total purchasedTimeoffs
        user.purchasedTimeoffs.map((purchasedTimeoff) => {
            if ((new Date(purchasedTimeoff.createdAt).getMonth() + 1) + '-' + new Date(purchasedTimeoff.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                totalPurchasedTimeoffByCoins = totalPurchasedTimeoffByCoins + parseFloat(purchasedTimeoff.cost)
            }
        })

        /* ============================    total cost calculate for this month  ======================================== */

        // total cost this month
        const totalCostThisMonth = totalPurchasedBenfitsByCoins + totalDrawbackByCoins + totalPurchasedTimeoffByCoins;
        const totalEarnThisMonth = totalTasksCoinEarn + totalCoinEarn;
        const finalCoinValue = totalEarnThisMonth - totalCostThisMonth;

        res.json({
            coin: finalCoinValue,
            message: `Team member of the month data loaded successfully!`,
            success: true,
        });

    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to load team meember of the month!",
            success: false,
        });
    }
};
