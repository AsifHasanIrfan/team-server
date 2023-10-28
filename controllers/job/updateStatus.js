// internal import
const Job = require("../../models/jobs");

module.exports = async (req, res) => {
  try {
    const { status } = req.body;
    const verifyJob = await Job.findOne({ _id: req.params.jobId });

    if (verifyJob) {
      const updatedData = await Job.findOneAndUpdate(
        { _id: req.params.jobId },
        { status: status } 
      );

      res.json({ message: "Job successfully updated", success: true, updated: updatedData });
    }else{
      return res.json({ message: "Job not found", success: false });
    }
  } catch (error) {
    res.json({ error: error.message, message: "Failed to update job", success: false });
  }
};
