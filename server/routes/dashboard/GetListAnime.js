const express = require("express");
const Anime = require("../../models/Schemas/AnimeSchema");
const router = express.Router();

router.get("/getlistanime", async (req, res) => {
  try {
    const listAnime = await Anime.find();
    return res.status(200).json({ success: true, data: listAnime });
  } catch (error) {
    console.error("Error fetching anime list:", error);
    return res.status(500).json({ success: false, error: "An error occurred while fetching the anime list." });
  }
});

router.get("/getlistanime/reversed", async (req, res) => {
  try {
    const listAnime = await Anime.find();
    const reversedListAnime = listAnime.reverse(); // Reverse the list
    return res.status(200).json({ success: true, data: reversedListAnime });
  } catch (error) {
    console.error("Error fetching reversed anime list:", error);
    return res.status(500).json({ success: false, error: "An error occurred while fetching the reversed anime list." });
  }
});

router.get("/getlistanime/:id", async (req, res) => {
    const { id } = req.params;
    try {

      const anime = await Anime.findById(id);
      if (!anime) {
        return res.json({message: "Cant Find This Anime in Burgeranime !" , success: false });
      }

      return res.status(200).json({success: true, anime});
      
    } catch (error) {
      console.error("Error fetching anime list:", error);
      return res.status(500).json({ success: false, error: "An error occurred while fetching the anime list." });
    }
} )

module.exports = router;
