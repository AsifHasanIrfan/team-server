// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
    try {
        const verifyUser = await User.find({ _id: req.params.userId });
        if (!verifyUser) return res.send({ message: 'User not found!', success: false });
        if (verifyUser.workingAs === 'Team Leader') return res.send({ message: 'Already Assigned To Team Leader!', success: false });

        await User.findOneAndUpdate({ _id: req.params.userId },{ workingAs: 'Team Leader' });

        res.json({ message: "Team Leader Assigned!", success: true });
    } catch (error) {
        res.json({ error: error.message, message: "Failed to assigned team leader!", success: false });
    }
};
