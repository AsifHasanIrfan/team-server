// internal import
const RequestLogin = require("../../models/requestLogin");

module.exports = async (req, res) => {
  try {
    const datas = await RequestLogin.find().sort("-createdAt");
    res.json({
      count: datas.length,
      datas: datas,
      message: "Successfully get all data",
      success: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to get request login data",
      success: false
    })
  }
};
