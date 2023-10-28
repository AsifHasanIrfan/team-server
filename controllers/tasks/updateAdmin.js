// internal import
const Tasks = require("../../models/tasks");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const { title, description, revision_description, dueDateAndTime, status, percentDgCoin, dgCoin } = req.body;
    const verifyTask = await Tasks.find({ _id: req.params.taskId })

    const userId = verifyTask[0].worker._id;
    let taskDGCoinAmount = dgCoin;

    if (verifyTask[0].inRevisionCount > 3) {
      const percent = (20 * dgCoin) / 100;
      taskDGCoinAmount = dgCoin - Math.round(percent);
    }

    const findUser = await User.findOne({ _id: userId });

    if (verifyTask) {
      const updatedData = await Tasks.findOneAndUpdate(
        { _id: req.params.taskId },
        { title, description, revision_description, dueDateAndTime, status, dgCoin, updateTime: new Date() },
        { new: true }
      );

      if (status === "In Revision") {
        await Tasks.findOneAndUpdate(
          { _id: req.params.taskId },
          {
            status,
            revision_description,
            inRevisionCount: verifyTask[0].inRevisionCount + 1,
            updateTime: new Date(),
          }
        );
      }

      if (status === "Approved") {
        await User.findOneAndUpdate({ _id: userId }, {
          dgCoin: parseFloat(findUser.dgCoin) + parseFloat(taskDGCoinAmount)
      }, { new: true });

        await Tasks.findOneAndUpdate(
          { _id: req.params.taskId },
          {
            receiveDgCoin: parseFloat(taskDGCoinAmount),
          },
          { new: true }
        );
      }

      if (status === "Approved Late") {
        let lessDgCoin = percentDgCoin;

        if (verifyTask[0].inRevisionCount > 3) {
          const percent = (20 * percentDgCoin) / 100;
          lessDgCoin = percentDgCoin - Math.round(percent);
        }

        await User.findOneAndUpdate(
          { _id: userId },
          {
            dgCoin: parseFloat(findUser.dgCoin) + parseFloat(lessDgCoin),
          },
          { new: true }
        );

        await Tasks.findOneAndUpdate(
          { _id: req.params.taskId },
          {
            receiveDgCoin: parseFloat(lessDgCoin),
          },
          { new: true }
        );
      }

      res.json({ message: "Task successfully updated", success: true, updated: updatedData });
    }
    else {
      return res.json({ message: "Task not found", success: false });
    }
  } catch (error) {
    res.json({ error: error.message, message: "Failed to update task", success: false });
  }
};