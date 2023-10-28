// internal import
const Achievement = require("../../models/achievement");
const User = require("../../models/users");

module.exports = async (req, res) => {
    try {

        const findUser = await User.findOne({ _id: req.body.user });
        if (!findUser) return res.status(404).send({ message: 'User not found!', success: false });

        const achievement = new Achievement(req.body);
        const result = await achievement.save();

        // dg amount adding to user schema
        if (result._id) {
            await User.findOneAndUpdate({ _id: req.body.user }, {
                $push: { achievements: result._id },
            }, { new: true }
            );
        }

        res.json({
            data: achievement,
            message: "Successfully Achievement Given!",
            success: true
        });

    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to create achievement!",
            success: false
        });
    }
};

