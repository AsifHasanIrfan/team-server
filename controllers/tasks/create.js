// internal import
const Tasks = require("../../models/tasks");
const User = require("../../models/users")

module.exports = async (req, res) => {
  try {

    // check is admin or team leader?
    if (req.user.role !== 'admin') {
      if (req.user.workingAs !== 'Team Leader') {
        return res.json({ message: "Contact Digital Gregg for more information", success: false });
      }
    }

    const user = await User.findOne({ _id: req.params.userId })

    if (user) {
      const newTask = new Tasks({
        ...req.body,
        worker: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        updateTime: new Date(),
      });

      await User.findOneAndUpdate({ _id: req.params.userId },
        {
          $push: { tasks: newTask._id },
        }, { new: true, }
      );

      await newTask.save();

      res.json({ message: "Successfully task created", success: true, task: newTask });
    } else {
      res.json({ message: "User not found", success: false });
    }
  } catch (error) {
    res.json({ error: error.message, message: "Failed to create task", success: false });
  }
};