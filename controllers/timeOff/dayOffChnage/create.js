// internal import
const RequestOffDay = require("../../../models/requestOffDay");

module.exports = async (req, res) => {
  try {

    const findData = await RequestOffDay.findOne({ user: req.body.user, status: 'progress' });

    // checking is there any request
    if(findData) res.json({ message: "Already have a pending request!!", success: false });

    const data = new RequestOffDay(req.body);
    await data.save();

    res.json({
      message: "Successfully created request!",
      success: true
    });

  } catch (error) {
    res.json({
        error: error.message,
        message: "Failed to create change off day request!",
        success: false
      });
  }
};

