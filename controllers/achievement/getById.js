// internal import
const Achievement = require("../../models/achievement");

module.exports = async (req, res) => {
    try {

        // checking is that user trying to get data
        if (req.user.role !== 'admin') {
            if (req.user._id.toString() !== req.params.userId.toString()) {
                return res.send({ message: 'You are not authorized token!', success: false });
            }
        }

        const datas = await Achievement.find({ user: req.params.userId }).sort("-createdAt");

        res.json({
            datas,
            message: "Successfully get data",
            success: true,
        });
    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to get achievement",
            success: false,
        });
    }
};