// internal import
const TeamReward = require("../../models/teamReward");

module.exports = async (req, res) => {
    try {

        const teamRewardDatas = await TeamReward.find();

        // checking length
        if (teamRewardDatas.length > 1) return res.send({ message: 'Already data is there!' });

        if (teamRewardDatas.length < 1) {
            const newData = new TeamReward(req.body);
            await newData.save();

            res.json({
                message: "Team Reawad Created Successfully!",
                success: true,
            });
        } else {
            await TeamReward.findOneAndUpdate({ _id: req.body.dataId },
                req.body,
                { new: true });

            res.json({
                message: "Team Reawad Updated Successfully!",
                success: true,
            });
        }

    } catch (error) {
        console.log(error.message)
        res.json({ error: error.message, message: "Failed to update team reward!", success: false });
    }
};
