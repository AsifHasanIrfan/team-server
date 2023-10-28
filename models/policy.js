// external imports
const mongoose = require("mongoose");
 
// task Schema
const policySchema = new mongoose.Schema({
    content: {
      type: String,
      required: [true, "Please enter content"],
    },
    users: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "User" 
    }],
  },{ timestamps: true });

// benefit model
const policy = mongoose.model("Policy", policySchema);
module.exports = policy;