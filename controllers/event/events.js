// internal import
const Events = require("../../models/event");

module.exports = async (req, res) => {
  try {
    const events = await Events.find()
    res
      .json({ 
          events,
          message: "Successfully get event", 
          success: true 
       });

  } catch (error) {
    res
      .json({ error: error.message, message: "Failed to get event", success: false });
  }
};
