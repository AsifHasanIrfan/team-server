// internal import
const Benefit = require("../../models/benefit");
const AssignBenefit = require("../../models/assignBenefit");

module.exports = async (req, res) => {
    try {
        const assignedBenefits = await AssignBenefit.find().populate(
            "user",
            "firstName lastName"
        ).populate(
            "benefit",
            "-user"
        ).sort({ createdAt: -1 });

        res.json({
                datas: assignedBenefits,
                message: "Successfully get daata",
                success: true,
            });
    } catch (error) {
        res.json({
                error: error.message,
                message: "Failed to get assigned benefit data",
                success: false
            })
    }
};
