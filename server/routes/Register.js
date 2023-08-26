const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usermodel = require("../models/Schemas/UsersSchema");

router.post("/register/signup" , async (req, res) => {
   const { username , email , password } = req.body;
   
   try {
      const User = await Usermodel.findOne({email});

      if(User) {
         return res.json({ message: "This Email Already Exists. Choose Another One!" });
      }

      const pwd = await bcrypt.hashSync(password,10);
      const now = new Date();
      const time = `${now.getDate()} / ${now.getMonth() + 1} / ${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}`;


      const Usernew = await new Usermodel({
         username,
         email,
         password : pwd,
         avatar : "https://firebasestorage.googleapis.com/v0/b/burgeranime-4a245.appspot.com/o/avatars%2Favatar.png?alt=media",
         // Rank User VIP / ADMIN / DEMO
         ranks: {
               admin : 0,
               vip : 0,
               demo : 1
         },
         //
         favoriteAnime : null,
         aboutme: "Hello",
         datecreate : time 
      }).save();


      const payload = {
         id : Usernew._id,
         username : Usernew.username,
         email,
         avatar : Usernew.avatar,
         ranks : Usernew.ranks,
         favoriteAnime: Usernew.favoriteAnime,
         aboutme: Usernew.aboutme,
         datecreate: Usernew.datecreate
      };
      const token = jwt.sign(payload, process.env.JWT_KEY );

      // Send the successful response with the newly created user
      return res.status(201).json({token , message : "successfully..."});




   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
   }

})

router.post("/register/signin" , async (req, res) => {
   const { email , password } = req.body;
   const user = await Usermodel.findOne({email});
   if (!user) {
      return res.json({"message" : "This User Not Exist!! CRÉER UN COMPTE "});
   }

   const checkpwd = await bcrypt.compare(password,user.password);
   if (!checkpwd) {
      return res.json({message: "Email Or Password Incorrect !!"});
   }

   const payload = {
      id : user._id,
      username : user.username,
      email,
      avatar : user.avatar,
      ranks : user.ranks,
      favoriteAnime: user.favoriteAnime,
      aboutme: user.aboutme,
      datecreate: user.datecreate
   };

   const token = await jwt.sign(payload, process.env.JWT_KEY);
   return res.status(200).json({token , message: "Signin successfully!!"});

})

module.exports = router;
