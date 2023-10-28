// internal import
const DG = require("../../models/dg");

module.exports = async (req, res) => {
    try {

        // checking is that user trying to get data
        if (req.user.role !== 'admin') {
            if (req.user._id.toString() !== req.params.userId.toString()) {
                return res.send({ message: 'You are not authorized token!', success: false });
            }
        }

        const datas = await DG.find({ user: req.params.userId }).sort("-createdAt");

        res.json({
            datas,
            message: "Successfully get user",
            success: true,
        });
    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to get user",
            success: false,
        });
    }
};