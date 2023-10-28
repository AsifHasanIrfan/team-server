// internal import
const ForgetPassword = require("../../models/forgetRequest");

module.exports = async (req, res) => {
  try {
    const requests = await ForgetPassword.find();
    res.json({
        datas: requests,
        message: "Successfully get all data",
        success: true,
      });
  } catch (error) { 
    res.json({
        error: error.message,
        message: "Failed to get request data",
        success: false
      })
  }
};
