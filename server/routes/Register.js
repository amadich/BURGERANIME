const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usermodel = require("../models/Schemas/UsersSchema");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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




// Endpoint to request a password reset
router.post("/register/forgot-password", async (req, res) => {
   const { email } = req.body;
   console.log(email);
   
 
   try {
     // Find user by email
     const user = await Usermodel.findOne({ email });
     if (!user) {
       return res.status(404).json({ message: "User with that email not found." });
     }
 
     // Generate a reset token
     const resetToken = crypto.randomBytes(32).toString("hex");
     const resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
 
     // Save the reset token and its expiration to the user document (you may also want to add a 'resetTokenUsed' field)
     user.resetToken = resetToken;
     user.resetTokenExpiration = resetTokenExpiration;
     await user.save();
 
     // Create a reset URL to send in the email
     const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
     console.log(resetUrl);
 
     // Set up the email transport (assuming you're using Gmail, but you can use another service)
     const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
       auth: {
         user: `${process.env.EMAIL_TRANS}`,
         pass: `${process.env.APPMAIL_PASSWORD}`,
       },
     });
 
     // Set up the email content
     const mailOptions = {
       from: `${process.env.EMAIL_TRANS}`,
       to: email,
       subject: "Password Reset Request",
       text: `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`,
     };
 
     // Send the email
     transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
         return res.status(500).json({ message: "Failed to send email." });
       }
       res.status(200).json({
         message: "Password reset link sent. Please check your email.",
       });
     });
 
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Something went wrong. Try again." });
   }
 });


 // Endpoint to reset the password
router.post("/register/reset-password", async (req, res) => {
   const { token, newPassword } = req.body;
 
   try {
     // Find the user by reset token and check if the token is still valid
     const user = await Usermodel.findOne({ resetToken: token });
     if (!user) {
       return res.status(400).json({ message: "Invalid reset token." });
     }
 
     // Check if the token has expired
     if (user.resetTokenExpiration < Date.now()) {
       return res.status(400).json({ message: "Reset token has expired." });
     }
 
     // Hash the new password
     const hashedPassword = await bcrypt.hash(newPassword, 10);
 
     // Update the password in the database
     user.password = hashedPassword;
     user.resetToken = undefined; // Clear the reset token
     user.resetTokenExpiration = undefined; // Clear the expiration time
     await user.save();
 
     // Send a success response
     res.status(200).json({ message: "Password reset successfully." });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Something went wrong. Try again." });
   }
 });
 

module.exports = router;
