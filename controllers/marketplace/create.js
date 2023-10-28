// internal import
const Marketplace = require("../../models/marketplace");

module.exports = async (req, res) => {

  try {
    const marketplace = new Marketplace(req.body);
    await marketplace.save();

    res.json({
      data: marketplace,
      message: "Successfully created marketplace job!",
      success: true,
    });

  } catch (error) {
    res.json({
        error: error.message,
        message: "Failed to create marketplace job!",
        success: false
      });
  }
};