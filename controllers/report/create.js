// internal import
const Report = require("../../models/report");
const User = require("../../models/users");

module.exports = async (req, res) => {
    try {
        const report = new Report(req.body);
        const result = await report.save();

        if (result._id) {
            await User.findOneAndUpdate({ _id: req.body.user }, {
                $push: { reports: result._id },
            }, { new: true } );
        }

        res.json({
            message: "Successfully report submitted!",
            success: true,
        });
    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to create report",
            success: false,
        });
    }
};
