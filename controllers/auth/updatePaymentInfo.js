// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const verifyUser = await User.find({ _id: req.params.userId });

    if (verifyUser) {
      await User.findOneAndUpdate({ _id: req.params.userId }, {
        payment: req.body
      }, { new: true });

      res.json({ message: "Payment Information updated!", success: true });
    }
    else {
      return res.json({ message: "User not found", success: false });
    }
  } catch (error) {
    res.json({ error: error.message, message: "Failed to update payment information!", success: false });
  }
};
