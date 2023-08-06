const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Usermodel = require("../models/Schemas/UsersSchema");

router.post("/auth", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token and decode its payload
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userID = decodedToken.id;
    

    if (!userID) {
      return res.json({ message: "Invalid or missing token" });
    }

    // Find the user based on the decoded token's ID
    const user = await Usermodel.findById(userID);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const compte = {
      id : user._id,
      username : user.username,
      email: user.email,
      avatar : user.avatar,
      ranks : user.ranks,
      favoriteAnime: user.favoriteAnime,
      datecreate: user.datecreate

    }
    const newtoken = jwt.sign(compte,process.env.JWT_SECRET);
    return res.json({ token : newtoken });


  } catch (error) {
    console.error("Error validating token:", error);
    return res.json({ message: "Internal Server Error" });
  }
});

module.exports = router;
