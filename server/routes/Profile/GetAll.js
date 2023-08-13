const express = require("express");
const Usermodel = require("../../models/Schemas/UsersSchema");
const router = express.Router();

router.get("/profile/getall", async (req, res) => {
   try {

      const users = await Usermodel.find();
      return res.json({users});
      
   } catch (error) {
      res.send({meesage: error})
   }
})

module.exports = router