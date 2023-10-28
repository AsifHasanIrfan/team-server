// internal import
const DG = require("../../models/dg");
const User = require("../../models/users");

module.exports = async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.body.user });
        if (!findUser) return res.status(404).send({ message: 'User not found!', success: false });

        const dg = new DG(req.body);
        const result = await dg.save();

        // dg amount adding to user schema
        if (result._id) {

            await User.findOneAndUpdate({ _id: req.body.user }, {
                  $push: { dgDetails: result._id },
                },{ new: true }
              );

            await User.findOneAndUpdate({ _id: req.body.user }, {
                dgCoin: parseFloat(findUser.dgCoin) + req.body.amount
            }, { new: true });
        }

        res.json({
            datas: dg,
            message: "Successfully Coin Gifted",
            success: true
        });

    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed To Gift Coin!",
            success: false
        });
    }
};