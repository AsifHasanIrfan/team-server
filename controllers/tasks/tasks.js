// internal import
const Tasks = require("../../models/tasks");

module.exports = async (req, res) => {
  try {
    let tasks = await Tasks.find().sort({ $natural:-1 })

    res
      .json({ 
          tasks,
          message: "Successfully get task", 
          success: true 
       });

  } catch (error) {
    res
      .json({ error: error.message, message: "Failed to get task", success: false });
  }
};