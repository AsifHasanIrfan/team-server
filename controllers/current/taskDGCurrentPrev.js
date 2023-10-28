// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {

    // if not this mail can not access this api
    if (req.user.role !== 'admin') {
        if (req.user._id.toString() !== req.params.id.toString()) {
            return res.send({ message: 'You are not authorized token!', success: false });
        }
    }

    // current
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const prevMonth = new Date().getMonth();

    try {
        // users
        const user = await User.findOne({ _id: req.params.id })
            .populate('tasks', '-_id createdAt dgCoin receiveDgCoin status')
            .select("username");

        // variables
        let totalThisMonthTaskCoin = 0;
        let totalLastMonthTaskCoin = 0;

        // task approved dg coins calculated
        user.tasks.map((task) => {
            // console.log(task);
            if ((task.status === 'Approved' || task.status === 'Approved Late') && (new Date(task.createdAt).getMonth() + 1) + '-' + new Date(task.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
                totalThisMonthTaskCoin = totalThisMonthTaskCoin + parseFloat(task.receiveDgCoin)
            }

            //  prev month total drawbacks
            if ((task.status === 'Approved' || task.status === 'Approved Late') && (new Date(task.createdAt).getMonth() + 1) + '-' + new Date(task.createdAt).getFullYear() === ((prevMonth === 0 ? 12 : prevMonth) + '-' + (prevMonth === 0 ? currentYear - 1 : currentYear))) {
                totalLastMonthTaskCoin = totalLastMonthTaskCoin + parseFloat(task.receiveDgCoin)
            }
        })

        res.json({
            data: {
                totalThisMonthTaskCoin, totalLastMonthTaskCoin
            },
            message: `Task earn dg data loaded successfully!`,
            success: true,
        });

    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to load task earn dg data!",
            success: false,
        });
    }
};
