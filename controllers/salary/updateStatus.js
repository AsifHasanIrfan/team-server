// internal import
const Salary = require("../../models/salary");

module.exports = async (req, res) => {
  try {
    const { status } = req.body;
    const verifySalary = await Salary.find({ _id: req.params.salaryId });
    if (verifySalary) {
      await Salary.findOneAndUpdate({ _id: req.params.salaryId }, { status });
      res.json({
        message: "Salary status updated successfully!",
        success: true,
      });
    } else {
      return res.json({ message: "Salary not found!", success: false });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to update salary status!",
      success: false,
    });
  }
};
