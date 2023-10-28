// internal import
const Job = require("../../models/jobs");

module.exports = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();

    res.json({
      data: job,
      message: "Successfully created job!",
      success: true
    });

  } catch (error) {
    res.json({
        error: error.message,
        message: "Failed to create job!",
        success: false
      });
  }
};

