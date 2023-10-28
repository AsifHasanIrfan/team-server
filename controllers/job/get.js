// internal import
const Job = require("../../models/jobs");

module.exports = async (req, res) => {
  try {
    const jobs = await Job.find().sort("-createdAt");
    res.json({
        datas: jobs,
        message: "Successfully get all data",
        success: true,
      });
  } catch (error) { 
    res.json({
        error: error.message,
        message: "Failed to get job data",
        success: false
      })
  }
};
