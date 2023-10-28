// internal import
const Payment = require("../../models/payment");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    // if not this mail can not access this api
    if (req.user.email !== 'greggmckee3@gmail.com') {
      return res.send({ message: 'You are not authorized!', success: false });
    }

    const findPayments = await Payment.find({ user: req.params.id }).sort("-createdAt");

    if (findPayments.length) {
      if (findPayments[0].salary === req.body.salary) return res.json({ message: `Can't send same as last record!`, success: false });
    }

    const payment = new Payment({ ...req.body, user: req.params.id });
    const result = await payment.save();

    await User.findOneAndUpdate({ _id: req.params.id }, {
      $set: { monthlyPayment: req.body.salary },
      $push: { payments: result._id },
    }, { new: true });

    res.json({
      payment,
      message: "Successfully payment updated!",
      success: true,
    });

  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to updated payment!",
      success: false,
    });
  }
};
