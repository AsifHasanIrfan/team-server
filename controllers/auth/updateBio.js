// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const { bio } = req.body;

    const verifyUser = await User.find({ _id: req.params.userId });

    if (verifyUser) {
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { bio: bio }
      );

      res
        .json({ message: "Status updated succesfully!", success: true });
    }
    else{
      return res
        .json({ message: "User not found", success: false });
    }
  } catch (error) {
    res
      .json({ error: error.message, message: "Failed to update bio!", success: false });
  }
};
