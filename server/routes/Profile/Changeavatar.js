const express = require("express");
const router = express.Router();
const Usermodel = require("../../models/Schemas/UsersSchema"); // Replace "../path/to/UsersSchema" with the actual path to the UsersSchema file

router.post("/profile/changeavatar", async (req, res) => {
  const { id, avatarID } = req.body;
   const urlavatar = `https://firebasestorage.googleapis.com/v0/b/burgeranime-4a245.appspot.com/o/avatars%2F${avatarID}?alt=media`;
  try {
    // Find the user by ID and update the avatar field
    const updatedUser = await Usermodel.findOneAndUpdate(
      { _id: id },
      { avatar: urlavatar },
      { new: true } // Return the updated user after the update
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "Avatar updated successfully"});
  } catch (error) {
    console.error("Error updating avatar:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/profile/updateaboutme", async (req, res) => {
   const {id , aboutme} = req.body;
   try {

      const updatedUser = await Usermodel.findOneAndUpdate(
         { _id: id },
         { aboutme: aboutme },
         { new: true } // Return the updated user after the update
       );
   
       if (!updatedUser) {
         return res.status(404).json({ message: "User not found" });
       }

       res.json({message : "Update information successfully!!"})
      
   } catch (error) {
      console.log(error);
      res.json({meesage: error});
   }
})

module.exports = router;
