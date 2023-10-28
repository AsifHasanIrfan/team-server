// external imports
const mongoose = require("mongoose");
 
// task Schema
const teamRewardSchema = new mongoose.Schema({
    rewardAmount: {
      type: Number,
      required: [true, "Please enter reward amount"],
    },
    drawbackAmount: {
      type: Number,
      required: [true, "Please enter drawback amount"],
    },  
    additionalDrawbackAmount: {
      type: Number,
      required: [true, "Please enter additional drawback amount"],
    },
},{ timestamps: true });

// task model
const teamReward = mongoose.model("TeamReward", teamRewardSchema);
module.exports = teamReward;
