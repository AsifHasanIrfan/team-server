// internal import
const Conversion = require("../../models/conversion");

module.exports = async (req, res) => {
  try {
    await Conversion.findOneAndUpdate({ _id: req.params.id }, {
      $set: req.body
    }, { new: true });

    res.json({
      message: "Successfully conversion updated",
      success: true
    });

  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to conversion update!",
      success: false
    });
  }
};

