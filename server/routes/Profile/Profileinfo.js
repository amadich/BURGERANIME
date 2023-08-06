const express = require("express");
const router = express.Router();
const Usermodel = require("../../models/Schemas/UsersSchema");

router.get("/profileinfo/:id/:tokenid", async (req,res) => {
      const { id , tokenid } = req.params;
      try {

         const user = await Usermodel.findById(id);
         if (user) {
            if ( user._id == tokenid ) {
               return res.status(200).json({username : user.username , me:true});
            }
            else {
               return res.status(200).json({username : user.username , avatar : user.avatar , aboutme: user.aboutme , me:false});
            }
         }
         
            

      } catch (error) {
         console.log(error);
         res.status(500).json({error});
      }
})

module.exports = router;