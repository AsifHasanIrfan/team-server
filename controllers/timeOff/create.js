// internal import
const TimeOff = require("../../models/timeOff");
const User = require("../../models/users");

module.exports = async (req, res) => {
  try {

    // finding user
    const findUser = User.findOne({ _id: req.body.user });

    if(req.body.type === 'Change Off Day'){
       const findOffDayReq = await TimeOff.findOne({ user: req.body.user, type: 'Change Off Day', status: 'progress' });
       if(findOffDayReq) return res.send({ message: 'You already have an request!', success: false });
    }

    // checking is user have access
    if(findUser?.workingAs === 'Intern' || findUser?.workingAs === 'Trial Member' || findUser?.isArchived){
      return res.send({ message: 'You dont have access to this!', success: false });
    }

    // const timeOff = new TimeOff(req.body);

    // await User.findOneAndUpdate({ _id: req.body.user },{
    //     $push: { timeOff: timeOff._id },
    //   }, { new: true });

    // await timeOff.save();

    res.json({
      // datas: { ...timeOff._doc, user: req.user },
      message: "Successfully request submitted",
      success: true
    });

  } catch (error) {
    res.json({
        error: error.message,
        message: "Failed to create time off request!",
        success: false
      });
  }
};

