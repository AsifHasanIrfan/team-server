// internal import
const Contact = require("../../models/contact");

module.exports = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });;
    res
      .json({
        datas: contacts,
        message: "Successfully get all data",
        success: true,
      });
  } catch (error) { 
    res
      .json({
        error: error.message,
        message: "Failed to get contact data",
        success: false
      })
  }
};
