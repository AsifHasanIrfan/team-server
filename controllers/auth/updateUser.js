// external import 
const bcrypt = require("bcrypt");
const uuid = require('uuid');

// internal import
const User = require("../../models/users");

module.exports = async (req, res) => {
  try { 
    let updatedPassword
    const theAdmin = await User.findOne({ role : "admin" })

    if(req.body.password){
      const user = await User.findOne({ _id : req.user._id })

      const isValidOldPass = await bcrypt.compare(req.body.old_password, user.password);

      if(isValidOldPass){
         const newPassword = req.body.password.replace(/ /g, "");
         updatedPassword = newPassword
      }else{
        return res.json({ message: "Old password is not correct", success: false });
      }
    }

    let allData = {
      fullname : (req.user.firstName + ' ' + req.user.lastName),
      username : req.user.username,
      userId : req.user._id,
      id : uuid.v4(),
      ...req.body
    }

    if(req.body.password){
      allData.password = updatedPassword
    }

    if(req.user.role === 'employee'){
      const isRequest = theAdmin.updateRequest.find(e => e.userId.equals(req.user._id))
      
      if(isRequest !== undefined){
        return res.json({ message: `You have a panding request`, success: false });
      }else{
        await User.updateMany(
          { role : 'admin' },
          {
            $push: { updateRequest : { ...allData } },
          },
          {
            new: true,
          }
        ); 
  
        return res.json({ 
          message: req.body.password ? `Sent password update request` : `Sent information update request`, 
          success: true, 
          updated : { ...allData } 
        });
      }
    }else if(req.user.role === 'admin'){
      let hashedPassword = req.user.password

      if(req.body.password){
        const newPassword = req.body.password.replace(/ /g, "");
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }

      let updated = await User.updateMany(
        { _id : req.user._id },
        { ...req.body, password : hashedPassword }
      )

      return res.json({ 
        message: req.body.password ? `Password has been updated` : `Information has been updated`, 
        success: true, 
        updated : { ...updated, ...req.body, password : hashedPassword } 
      })
    }
  
  } catch (error) {
    res.json({ error: error.message, message: "Failed to update user", success: false });
  }
}