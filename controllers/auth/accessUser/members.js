// internal import
const Users = require("../../../models/users");

module.exports = async (req, res) => {
    try {
        const users = await Users.find().populate('tasks achievements', 'status -_id imgUrl title date').select("firstName lastName bio workingAs facebook github linkedin others behance dribble upwork fiverr isArchived avatar role designation");

        const filterdusers = users.filter((item) => item.role !== 'admin' && !item.isArchived);

        res.json({
            users: filterdusers,
            message: "Successfully get members",
            success: true,
        });
    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to get members",
            success: false,
        });
    }
};
