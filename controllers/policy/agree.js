// internal import
const Policy = require("../../models/policy");
const User = require("../../models/users");

module.exports = async (req, res) => {
    try {

        const userId = req.params.id;

        const findUser = await User.findOne({ _id: userId })
        if (!findUser) return res.json({ message: "You are not registered!", success: false });

        // verify is user already agreed to terms
        const findIsAlreadyAgreed = await Policy.findOne({
            'users': {
                $in: userId
            }
        })

        if (findIsAlreadyAgreed) return res.json({ message: "You already agreed to terms!", success: false });

        // if not agreed then push user id to privacy users
        await Policy.findOneAndUpdate({ _id: req.body.policyId }, {
            $push: { users: userId },
        }, { new: true });

        
        res.json({ message: "Agreed to terms successfully!", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to agree", success: false });
    }
};
