// / internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id },
      { drawbacks: 1 }
    ).populate({
      path: "drawbacks",
      model: "Drawback",
      select: "-_id -user",
      options: { sort: { updatedAt: -1 } },
    });
    res.json({
      user,
      message: "Successfully get drawback info.",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get drawback info",
      success: false,
    });
  }
};