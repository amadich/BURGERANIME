const express = require("express");
const router = express.Router();
const Usermodel = require("../../models/Schemas/UsersSchema");

router.get("/profileinfo/:id/:tokenid", async (req, res) => {
  const { id, tokenid } = req.params;

  // Validate the id format
  if (id.length !== 24) {
    return res.status(400).json({ error: "Invalid id format" });
  }

  try {
    const user = await Usermodel.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found", notone: false });
    }

    // Check if the user is the same as the token id
    const isMe = user._id.toString() === tokenid;
    return res.status(200).json({
      username: user.username,
      avatar: user.avatar,
      aboutme: user.aboutme,
      ranks: user.ranks,
      me: isMe,
      notone: true,
    });
  } catch (error) {
    console.error("Error fetching profile info:", error);
    res.status(500).json({ error: "Server error", notone: false });
  }
});

module.exports = router;
