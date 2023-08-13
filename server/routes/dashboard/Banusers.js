const express = require("express");
const Usermodel = require("../../models/Schemas/UsersSchema");
const router = express.Router();

router.post("/yes/banuser", async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await Usermodel.findByIdAndDelete(id);
    if (deletedUser) {
      return res.json({ message: `User ID: ${id} has been deleted.` });
    } else {
      return res.json({ message: `User ID: ${id} not found.` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
