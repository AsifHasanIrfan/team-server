// internal import
const RequestLogin = require("../../models/requestLogin");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const verifyReq = await RequestLogin.findOne({ _id: id });

        if (verifyReq) {
            await RequestLogin.deleteOne({ _id: id });
            res.json({ message: "Request successfully deleted", success: true });
        } else {
            return res.send({ message: "Request not found", success: false });
        }
    } catch (error) {
        res.json({ error: error.message, message: "Failed to delete request", success: false });
    }
};