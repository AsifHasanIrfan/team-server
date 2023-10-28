// internal import
const User = require("../../models/users");
const Drawback = require("../../models/drawback");

module.exports = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }, { drawback: 1 });
    const findUser = await User.findOne({ _id: req.params.id }).select('dgCoin');

    if (!findUser) return res.send({ message: 'User not found!', success: false });

    const drawback = new Drawback({ ...req.body, user });
    const result = await drawback.save();

    if (req.body.type === 'by-coin') {
      await User.findOneAndUpdate({ _id: req.params.id }, {
        dgCoin: parseFloat(findUser.dgCoin) - parseFloat(req.body.drawback)
      }, { new: true });
    }

    if (result) {
      await User.findOneAndUpdate(
        { _id: req.params.id }, {
        $push: { drawbacks: result._id },
      }, { new: true });

      res.json({
        message: "Successfully create drawback.",
        success: true,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to create drawback!",
      success: false,
    });
  }
};
