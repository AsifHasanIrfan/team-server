// external import
const bcrypt = require("bcrypt");
const uuid = require("uuid");

// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const verifyUser = await User.findOne({ _id: req.params.id });
    if(!verifyUser) return res.json({ message: `User not found!`, success: false });
    
    if(req.body.password === ''){
      const { password, username, email, ...data } = req.body;
      await User.updateOne({ _id: req.params.id }, data);
    }else{
      if (req.body.password.length < 6) return res.json({ message: `Minimum six password!`, success: false });
      const { username, email, ...data } = req.body;

      // password hashing
      const newPassword = req.body.password.replace(/ /g, "");
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.updateOne({ _id: req.params.id }, { ...data, password: hashedPassword });
    }
    res.json({ message: `Successfully updated`, success: true });
  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to update user",
      success: false,
    });
  }
};
