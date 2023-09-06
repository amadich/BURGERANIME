const express = require("express");
const Usermodel = require("../../models/Schemas/UsersSchema");
const router = express.Router();


router.post("/tovip" , async (req, res) => {
    const { id , newRanks  } = req.body;

    try {
      
      const user = await Usermodel.findByIdAndUpdate(id, { ranks : newRanks });
      if (!user) return res.json({message : "User not found"});


      return res.json({ message: `User ID: ${id} has been Ranked to VIP.` });


    } catch (error) {
      console.log(error);
      return res.json({error})
    }

});


router.post("/toadmin" , async (req, res) => {

   const { id , newRanks  } = req.body;
   try {

      const user = await Usermodel.findByIdAndUpdate(id, { ranks : newRanks });
      if (!user) return res.json({message : "User not found"});


      return res.json({ message: `User ID: ${id} has been Ranked to Admin.` });

      
   } catch (error) {
     console.log(error);
     return res.json({error})
   }

});

router.post("/tohelper" , async (req, res) => {

  const { id , newRanks  } = req.body;
  try {

     const user = await Usermodel.findByIdAndUpdate(id, { ranks : newRanks });
     if (!user) return res.json({message : "User not found"});


     return res.json({ message: `User ID: ${id} has been Ranked to Helper.` });

     
  } catch (error) {
    console.log(error);
    return res.json({error})
  }

});


router.post("/todemo" , async (req, res) => {

   const { id , newRanks  } = req.body;
   try {

      const user = await Usermodel.findByIdAndUpdate(id, { ranks : newRanks });
      if (!user) return res.json({message : "User not found"});


      return res.json({ message: `User ID: ${id} has been Ranked to Demo.` });

      
   } catch (error) {
     console.log(error);
     return res.json({error})
   }

});


module.exports = router;
