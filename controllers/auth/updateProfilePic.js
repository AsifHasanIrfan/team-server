
// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
  
  try {
    const verifyUser = await User.findOne({ _id: req.params.id });
    if (verifyUser) {
      await User.updateOne({ _id: req.params.id }, {
        $set: {
          avatar: req.body.avatar
        }
      });

      res.json({ message: `Successfully updated`, success: true });
      
    } else {
      return res.json({ message: `User not found!`, success: false });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to update user profile photo",
      success: false,
    });
  }
};
