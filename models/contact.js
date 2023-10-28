// external imports
const mongoose = require("mongoose");
 
// task Schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    mobile: {
      type: String,
    }, 
    message: {
      type: String,
      required: [true, "Please enter message"],
    },
  },
  { timestamps: true }
);

// contact model
const contact = mongoose.model("Contact", contactSchema);
module.exports = contact;
