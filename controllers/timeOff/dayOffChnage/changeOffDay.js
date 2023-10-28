// internal import
const User = require("../../../models/users");
const RequestOffDay = require("../../../models/requestOffDay");


module.exports = async (req, res) => {
    try {
        const { status, reqId, weeklyOffday } = req.body;
        const findUser = await User.findOne({ _id: req.params.user });

        // if user not found
        if (!findUser) return res.send({ message: 'User not found!', success: false });

        if (findUser) {
            if (status === 'approved') {
                await User.findOneAndUpdate({ _id: req.params.user },
                    { weeklyOffday: weeklyOffday },
                    { new: true });

                await RequestOffDay.findOneAndUpdate({ _id: reqId },
                    { status: status }
                );
                res.json({ message: "Request successfully updated", success: true });
            }else if(status === 'decline'){
                await RequestOffDay.findOneAndUpdate({ _id: reqId },
                    { status: status }
                );
                res.json({ message: "Request successfully updated", success: true });
            }else{
                res.json({ message: "Server Issue", success: false });
            }
        }
    } catch (error) {
        res.json({ error: error.message, message: "Failed to update time off", success: false });
    }
};
