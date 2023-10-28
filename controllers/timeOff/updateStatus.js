// internal import
const TimeOff = require("../../models/timeOff");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {
    const { status, totalDays } = req.body;
    const verifyTimeOff = await TimeOff.findOne({ _id: req.params.timeOffId });

    if (verifyTimeOff) {

      if(status === 'approved' && verifyTimeOff.type === 'Vacation'){

        const findUser = await User.findOne({ _id: verifyTimeOff.user });
        if(findUser.availableTimeOff.vacationDays < totalDays) return res.status(200).send({ message: 'User have not enough vacation days left!', success: false });

        // data to send
        const data = {
          ...findUser.availableTimeOff, 
          vacationDays: (findUser.availableTimeOff.vacationDays - totalDays),
          takenVacationDays: (findUser.availableTimeOff.takenVacationDays + totalDays),
        }

        // updating
        await User.findOneAndUpdate( { _id: verifyTimeOff.user },{ 
          availableTimeOff: data 
        }, { new: true }); 
      }

      if(status === 'approved' && verifyTimeOff.type === 'Medical Emergency'){

        const findUser = await User.findOne({ _id: verifyTimeOff.user });
        if(findUser.availableTimeOff.sickDays < totalDays) return res.status(200).send({ message: 'User have not enough sick days left!', success: false });

         // data to send
        const data = {
          ...findUser.availableTimeOff, 
          sickDays: (findUser.availableTimeOff.sickDays - totalDays),
          takenSickDays: (findUser.availableTimeOff.takenSickDays + totalDays),
        }

        // updating
        await User.findOneAndUpdate({ _id: verifyTimeOff.user }, { 
          availableTimeOff: data 
        } ,{ new: true }); 
      }
  
      const updatedData = await TimeOff.findOneAndUpdate({ _id: req.params.timeOffId },
        { status: status } 
      ); 

      res.json({ message: "Time off successfully updated", success: true, updated: updatedData });
    }else{
      return res.json({ message: "Time off not found", success: false });
    }
  } catch (error) {
    res.json({ error: error.message, message: "Failed to update time off", success: false });
  }
};
