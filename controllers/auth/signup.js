// external imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const RequestLogin = require("../../models/requestLogin");
const send_signup_mail = require("../../middleware/sendSignUpEmail");

// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    // check is admin?
    if (req.user.role !== "admin") {
      return res.json({ message: "Only admin can make user", success: false });
    }

    const { email, username, password } = req.body;
    const newPassword = password.replace(/ /g, "");
    const lowerUsername = username.toLowerCase();
    const lowerEmail = email.toLowerCase();
    const fullName =  req.body.firstName + ' ' + req.body.lastName;

    const user = await User.findOne({
      $or: [{ email: lowerEmail }, { username: lowerUsername }],
    });

    if (!user) {
      const hashedPassword = await bcrypt?.hash(newPassword, 10);

      const data = {
        ...req.body,
        password: hashedPassword,
        username: lowerUsername,
      };

      const user = new User(data);
      const result = await user.save();

      if (result._id) {
        const findRequest = await RequestLogin.findOne({ email: lowerEmail });

        if(findRequest){
          await RequestLogin.deleteOne({ email: lowerEmail });
        }
        
        // sending mail
        send_signup_mail(lowerEmail, fullName, lowerUsername, newPassword);
      }

      res.json({ user, message: `User created successfully!`, success: true });
    } else {
      res.json({ message: `Email/Username already used!`, success: false });
    }
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to create user!",
      success: false,
    });
  }
};
