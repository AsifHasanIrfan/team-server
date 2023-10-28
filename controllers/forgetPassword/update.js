// internal import
const bcrypt = require("bcrypt");
const send_mail = require("../../middleware/sendMail");
const ForgetPassword = require("../../models/forgetRequest");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const { status } = req.body;
    const verifyRequest = await ForgetPassword.findOne({ _id: req.params.requestId });

    if (verifyRequest) {

      // update the status
      const updatedData = await ForgetPassword.findOneAndUpdate(
        { _id: req.params.requestId },
        { status: status }
      );

      // if status is approved then
      if (status === 'approved') {
        // finding the specific user
        const findUserByEmail = await User.findOne({ email: verifyRequest.email }).select('email firstName lastName -_id');

        // user full name
        const userFullName = findUserByEmail.firstName + ' ' + findUserByEmail.lastName;

        // making random pass and hasing that
        const randomPass = Math.random().toString(36).slice(2, 8);
        const hashedPassword = await bcrypt?.hash(randomPass, 10);

        // update the user password
        await User.findOneAndUpdate(
          { email: findUserByEmail.email },
          { password: hashedPassword }
        );

        // sending mail
        send_mail(req.params.requestId, findUserByEmail.email, userFullName, randomPass);
      }

      res.json({ message: "Request successfully updated", success: true, updated: updatedData });
    } else {
      return res.json({ message: "Request not found", success: false });
    }
  } catch (error) {
    res.json({ error: error.message, message: "Failed to update request", success: false });
  }
};
