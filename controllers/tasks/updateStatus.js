// internal import
const Tasks = require("../../models/tasks");

module.exports = async (req, res) => {
  try {
    const {
      status,
      blocked_description,
      latetask_description,
      submissionDate,
    } = req.body;
    const verifyTask = await Tasks.find({ worker: req.user._id, _id: req.params.taskId });

    if(verifyTask){
      if(status === 'Completed' || status === 'Completed Late') {
        const updatedData = await Tasks.findOneAndUpdate(
          { _id: req.params.taskId },
          {
            status: status,
            blocked_description: blocked_description,
            latetask_description: latetask_description,
            updateTime: new Date(),
            submissionDate: submissionDate,
          },
          { new: true }
        );
        res.json({
          message: "Task successfully updated",
          success: true,
          updated: updatedData,
        });
      } else {
        const updatedData = await Tasks.findOneAndUpdate(
          { _id: req.params.taskId },
          {
            status: status,
            blocked_description: blocked_description,
            latetask_description: latetask_description,
            updateTime: new Date(),
          }
        );
        res.json({
          message: "Task successfully updated",
          success: true,
          updated: updatedData,
        });
      }
    }
    else {
      return res.json({ message: "Task not found", success: false });
    }
  } catch (error) {
    res
      .json({ error: error.message, message: "Failed to update task", success: false });
  }
};