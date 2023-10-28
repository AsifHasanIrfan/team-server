// internal import
const Policy = require("../../models/policy");

module.exports = async (req, res) => {
  console.log(req.body)
    try {

        const policyDatas = await Policy.find();

        // checking length
        if (policyDatas.length > 1) return res.send({ message: 'Already data is there!' });

        if (policyDatas.length < 1) {
            const newData = new Policy(req.body);
            await newData.save();

            res.json({
                message: "Policy Created Successfully!",
                success: true,
            });
        } else {
            await Policy.findOneAndUpdate({ _id: req.body.dataId },
                { ...req.body, users: [] },
                { new: true });

            res.json({
                message: "Policy Updated Successfully!",
                success: true,
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to create policy",
            success: false,
        });
    }
};
