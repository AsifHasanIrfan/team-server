// internal import
const User = require("../../models/users");
const RequestLogin = require("../../models/requestLogin");

module.exports = async (req, res) => {
  try {

    const findUser = await User.findOne({ email: req.body.email });
    const alreadyRequested = await RequestLogin.findOne({ email: req.body.email });

    if (findUser) return res.json({ message: "You already have an account!", success: false });
    if (alreadyRequested) return res.json({ message: "You already have an request!", success: false });

    const requestLogin = new RequestLogin(req.body);
    await requestLogin.save();

    res.json({
      message: "Account request submitted successfully!",
      success: true
    }); 

  } catch (error) {
    res.json({
        error: error.message,
        message: "Failed to request!",
        success: false
      });
  }
};