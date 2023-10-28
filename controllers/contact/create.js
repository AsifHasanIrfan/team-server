// internal import
const Contact = require("../../models/contact");

module.exports = async (req, res) => {
  try {

    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const isValidEmail = regex.test(req.body.email);

    // checking is email valid or not
    if (!isValidEmail) return res.send({ message: 'Email is not valid!', success: false });

    // removing tags
    const name = req.body.name.replace(/<[^>]*>/g, '');
    const message = req.body.message.replace(/<[^>]*>/g, '');

    // saving data
    const contact = new Contact({...req.body, name, message});
    await contact.save();

    res.json({
      datas: contact,
      message: "Successfully inquiry submitted",
      success: true
    });

  } catch (error) {
    res.json({
      error: error.message,
      message: "Failed to inquiry request!",
      success: false
    });
  }
};

