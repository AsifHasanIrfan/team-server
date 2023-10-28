// external imports
const jwt = require("jsonwebtoken");

// internal imports
const User = require("../models/users");
const { JWT_ACCESS_TOKEN_PK } = require("../env");

// auth middleware
const auth = async (req, res, next) => {
  try {
    // get token from api header
    const { authorization } = req?.headers;
    const token = authorization?.split(" ")[1];

    // check founded token is valid or not
    if (!token) {
      return res.json({ message: "Token not found", success: false });
    }
 
    // verify checked token with JWT secret
    const verifyToken = await jwt.verify(token, JWT_ACCESS_TOKEN_PK);

    if (!verifyToken) {
      return res.json({ message: "Your token is not verified", success: false });
    }

    // get user data
    const user = await User?.findOne({ _id: verifyToken.id });

    // save user data to "req.user"
    req.user = user;
    next();
  } catch (error) {
    res.json({
      error: error.message,
      message: "Authentication failed",
      success: false,
    });
  }
};

module.exports = auth;
