// internal import
const User = require("../../models/users");
const ForgetPassword = require("../../models/forgetRequest");

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({email: email.toLowerCase() });

    if(!findUser){
      return res.json({ message: `You email is not valid!`, success: false });
    }

    const data = { email: email, username: findUser.username };

    const request = new ForgetPassword(data);
    await request.save();

    res.json({ message: `Request submitted successfully!`, success: true });
  } catch (error) {
    res.json({ error: error.message, message: "Failed to request!", success: false });
  }
};
