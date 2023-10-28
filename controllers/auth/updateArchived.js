// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const { isArchived } = req.body;
    const verifyUser = await User.find({ _id: req.params.userId });

    if (verifyUser) {
      await User.findOneAndUpdate({ _id: req.params.userId }, { isArchived });

      res.json({
        message: "Archived status updated succesfully!",
        isArchived,
        success: true,
      });
    } else {
      return res.json({ message: "User not found", success: false });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to update archived!",
      success: false,
    });
  }
};
