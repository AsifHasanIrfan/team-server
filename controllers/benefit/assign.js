const mongoose = require('mongoose');

// internal import
const AssignBenefit = require("../../models/assignBenefit");
const Benefit = require("../../models/benefit");
const User = require("../../models/users");

module.exports = async (req, res) => {
    try {
        // is valid id
        // if (!mongoose.Types.ObjectId.isValid(req.body.user)) return res.status(404).send({ message: 'Not valid Id!', success: false });
        if (!mongoose.Types.ObjectId.isValid(req.body.benefit)) return res.status(404).send({ message: 'Not valid Id!', success: false });

        const findBenefit = await Benefit.findOne({ _id: req.body.benefit });
        
        // const findUser = Benefit.findOne({ _id: req.body.user });
        let users = [...req.body.users];
        // if(findBenefit.users !== undefined) {
        //   users = [...users, ...findBenefit.users];
        // }
        
        // check
        if(!findBenefit) return res.status(404).send({ message: 'Benefit not found!', success: false });
        // if(!findUser) return res.status(404).send({ message: 'User not found!', success: false });

        const assigned = new AssignBenefit({
          ...req.body
        });
        const result = await assigned.save();

        if (result._id) {
            // sending user id to benefit model
            await Benefit.findOneAndUpdate(
              { _id: req.body.benefit },
              { $push: { users: { $each: users } } },
              { new: true }
            );

            // sending assign benefit id to user model
            // await User.findOneAndUpdate({ _id: req.body.user },{
            //         $push: { benefits: result._id },
            //     }, { new: true });

           await User.updateMany(
              { _id: { $in: req.body.users } },
              { $push: { benefits: result._id } },
              { multi: true }
            ); 
        }

        res.json({
            data: assigned,
            message: "Successfully benefit assigned",
            success: true
        });

    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to assign benefit!",
            success: false
        });
    }
};