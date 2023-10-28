const bcrypt = require("bcrypt");

// internal import
const Users = require("../../models/users");

module.exports = async (req, res) => {
  try {
      const requests = await Users.findOne({ role : "admin" })
      const currentReq = requests.updateRequest.find((e) => e.id === req.params.id)

      const { userId, username, password, fullname, id, ...reqs } = currentReq

      if(req.body.action === 'approved'){
        if(currentReq){
          let sendPayload = { ...reqs }

          if(password){
            const newPassword = password.replace(/ /g, "").toLowerCase();
            const hashedPassword = await bcrypt?.hash(newPassword, 10);

            sendPayload.password = hashedPassword
          }

          const updated = await Users.findOneAndUpdate(
            { _id : userId},
            { ...sendPayload }
          );

          await Users.updateMany(
            { role : 'admin' },
            { $pull : { updateRequest : { id } } }
          )

          res.json({ message: `Successfully approved`, success: true, id: req.params.id, updated : { ...updated, ...sendPayload } });
        }else{
          res
            .json({ 
              message: "Request not found", 
              success: false 
            });
        }
      }else if(req.body.action === 'declined'){
        await Users.updateMany(
          { role : 'admin' },
          { $pull : { updateRequest : { id } } }
        )

        res.json({ message: `Request declined`, success: true, id: req.params.id });
      }
  } catch (error) {
    res
      .json({ error: error.message, message: "Failed to approve update request", success: false });
  }
};