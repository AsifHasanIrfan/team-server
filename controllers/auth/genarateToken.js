// external imports
const jwt = require("jsonwebtoken");

// internal import
const User = require("../../models/users");
const { createAcessToken } = require("../../libs/createToken");
const { JWT_REFRESH_TOKEN_PK } = require("../../env");

const genarateToken = async (req, res) => {
  try {
    const rf_token = req.body.refresh_token;
    if (!rf_token) {
      return res
        .json({ message: "Failed to Login", success: false });
    }

    if (rf_token) {
      const verifiedToken = await jwt.verify(rf_token, JWT_REFRESH_TOKEN_PK);
      const user = await User.findOne({ _id: verifiedToken.id });

      if (user) {
        const accessToken = await createAcessToken({ id: user._id });
        const updatedUser =  await User.findOne({  _id: verifiedToken.id  }).populate("tasks timeOff salaries")

        res.json({
          token: accessToken,
          message: `successfully Login!`,
          user: {
            ...updatedUser._doc,
            password: "",
          },
          success: true,
        });
      } else {
        return res
          .json({ message: "Failed to Login", success: false });
      }
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to Login",
      success: false,
    });
  }
};

module.exports = genarateToken;