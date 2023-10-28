// internal import
const Marketplace = require("../../models/marketplace");

module.exports = async (req, res) => { 
  try {
    const data = await Marketplace.findOne({ _id: req.params.id });

    res.json({ data, message: "Successfully get job data", success: true});
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get job data",
      success: false,
    });
  }
};