// external imports
const bcrypt = require("bcrypt");

// internal import
const { DOMAIN } = require("../../env");
const User = require("../../models/users");
const {
  createAcessToken,
  createRefreshToken,
} = require("../../libs/createToken");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newPassword = password.replace(/ /g, "");
    const lowerUsername = username.toLowerCase();

    // checked if entered email is already used?
    const checkUsername = await User.findOne({ username: lowerUsername });
    if (!checkUsername) {
      return res.json({ message: `You passed an invalid username`, success: false });
    }

    // check password correct or incorrect?
    const checkPass = await bcrypt.compare(newPassword, checkUsername.password);
    if (!checkPass) {
      return res.json({ message: `You entered an incorrect password`, success: false });
    }

    if (checkUsername && checkPass) {
      const accessToken = await createAcessToken({ id: checkUsername._id });
      const refreshToken = await createRefreshToken({ id: checkUsername._id });

      const signedUser =  await User.findOne({ username: lowerUsername }).populate("tasks timeOff salaries benefits drawbacks")
      
      res.json({
        token: accessToken,
        refresh_token : refreshToken,
        message: `Login Success!`,
        user: {
          ...signedUser._doc,
          password: "",
        },
        success: true,
      });
    }
  } catch (error) {
    res
      .json({ error: error, message: "Failed to Login", success: false });
  }
};
