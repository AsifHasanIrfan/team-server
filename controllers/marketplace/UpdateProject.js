// internal import
const Marketplace = require("../../models/marketplace");

module.exports = async (req, res) => {
  try {
    const data = req.body;

    const verifyProject = await Marketplace.findOne({ _id: req.params.projectId });

    if (verifyProject) {
      const updatedData = await Marketplace.findOneAndUpdate(
        { _id: req.params.projectId },
        data
      );

      res.json({
        message: "Project details successfully updated",
        success: true,
        updated: updatedData,
      });
    } else {
      return res.json({ message: "Project not found", success: false });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to update Project",
      success: false,
    });
  }
};