// internal import
const Event = require("../../models/event");

module.exports = async (req, res) => {
  try {
    // check is admin?
    if (req.user.role !== "admin") {
      return res
        .json({ message: "Only admin can create event", success: false });
    }

    const newEvent = new Event({ ...req.body });
    await newEvent.save();

    res
      .json({ message: "Successfully event created", success: true });
  } catch (error) {
    res
      .json({ error: error.message, message: "Failed to create event", success: false });
  }
};
