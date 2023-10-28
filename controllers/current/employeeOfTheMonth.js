// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {

    // current
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    let emps = [];

    try {
        // users
        const users = await User.find()
            .populate('drawbacks purchasedTimeoffs tasks dgDetails purchasedBenefits', 'amount dgCost drawback cost type -_id createdAt date dgCoin updateTime status purchasedUsers isArchived updateTime receiveDgCoin status isCountForEMP')
            .select("username drawbacks purchasedBenefits purchasedTimeoffs tasks dgDetails isArchived role workingAs firstName lastName avatar email");

        // filter all active users
        const activeUsers = users.filter((item) => item.isArchived === false && item.role !== 'admin');

        activeUsers.map((item, index) => {

            // variables
            let totalTasksCoinEarn = 0;
            let totalCoinEarn = 0;
            let totalDrawbackByCoins = 0;
            let totalPurchasedTimeoffByCoins = 0;
            let totalPurchasedBenfitsByCoins = 0;
           

            /* ============================    total get calculate for this month  ======================================== */

            // gifted dg coins calculated
            const countedDGEMPs = item.dgDetails.filter((item) => item.isCountForEMP === true);
            countedDGEMPs.map((dg) => {
                if ((new Date(dg.createdAt).getMonth() + 1) + '-' + new Date(dg.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                    totalCoinEarn = totalCoinEarn + parseFloat(dg.amount)
                }
            })
            // task approved dg coins calculated
            item.tasks.map((task) => {
                if ((task.status === 'Approved' || task.status === 'Approved Late') && (new Date(task.createdAt).getMonth() + 1) + '-' + new Date(task.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                    totalTasksCoinEarn = totalTasksCoinEarn + parseFloat(task.receiveDgCoin)
                } else {
                    totalTasksCoinEarn = totalTasksCoinEarn + 0
                }
            })
            /* ============================    total get calculate for this month  ======================================== */



            /* ============================    total cost calculate for this month   ======================================== */

            // filter all coins drawback and calculate total
            const byCoinDrawbacks = item.drawbacks.filter((item) => item.type === 'by-coin');
            byCoinDrawbacks.map((drawback) => {
                if ((new Date(drawback.createdAt).getMonth() + 1) + '-' + new Date(drawback.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                    totalDrawbackByCoins = totalDrawbackByCoins + parseFloat(drawback.drawback)
                }
            })

            // calculate total purchased
            item.purchasedBenefits.map((purchasedBenefit) => {
                purchasedBenefit.purchasedUsers.map((purchasedUser) => {
                    if(purchasedUser.userId.toString() === item._id.toString() && (new Date(purchasedUser.purchasedDate).getMonth() + 1) + '-' + new Date(purchasedUser.purchasedDate).getFullYear() === (currentMonth + '-' + currentYear)){
                        totalPurchasedBenfitsByCoins = totalPurchasedBenfitsByCoins + parseFloat(purchasedBenefit.dgCost)
                    }
                })
            })

            // calculate total purchasedTimeoffs
            item.purchasedTimeoffs.map((purchasedTimeoff) => {
                if ((new Date(purchasedTimeoff.createdAt).getMonth() + 1) + '-' + new Date(purchasedTimeoff.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                    totalPurchasedTimeoffByCoins = totalPurchasedTimeoffByCoins + parseFloat(purchasedTimeoff.cost)
                }
            })

            /* ============================    total cost calculate for this month  ======================================== */

            // total cost this month
            const totalCostThisMonth = totalPurchasedBenfitsByCoins + totalDrawbackByCoins + totalPurchasedTimeoffByCoins;
            const totalEarnThisMonth = totalTasksCoinEarn + totalCoinEarn;
            const finalCoinValue = totalEarnThisMonth - totalCostThisMonth;

            emps.push({
                name: item.firstName + ' ' + item.lastName,
                email: item.email,
                workingAs: item.workingAs,
                avatar: item.avatar,
                coins: finalCoinValue
            })
        })

       

        // sorting array
        const sortedEmps = emps.filter((item) => item.email !== 'ripon.dev4266@gmail.com').sort((a, b) => b.coins - a.coins);
        // const slicedEmps = sortedEmps.slice(0, 10);

        res.json({
            datas: sortedEmps,
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
