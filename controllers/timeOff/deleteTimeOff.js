// internal import
const TimeOff = require("../../models/timeOff");

module.exports = async (req, res) => {
  try {
    const { timeOffId } = req.params;
    const verifyTimeOff = await TimeOff.findOne({ _id: timeOffId });

    if (verifyTimeOff) {

      // if(new Date(verifyTimeOff.startDate).setHours(0, 0, 0, 0) == new Date().toISOString().setHours(0, 0, 0, 0)){
      //   return res.send({ message: "Todays request can't be delete", success: false });
      // }

      await TimeOff.deleteOne({ _id: timeOffId });
      res.json({ message: "Request successfully deleted", success: true });
    }else{
      return res.send({ message: "Request not found", success: false });
    }
  } catch (error) {
    res.json({ error: error.message, message: "Failed to delete request", success: false });
  }
};
