const express = require("express");
const Anime = require("../../models/Schemas/AnimeSchema");
const router = express.Router();

router.post("/uploadanime", async (req, res) => {
  try {
    const {
      animeTitle,
      selectedGenres,
      animeBio,
      animeimgOr,
      animeimgBack,
      rating,
      format,
      animeSes,
    } = req.body;

    const fullurl1 = `https://firebasestorage.googleapis.com/v0/b/burgeranime-4a245.appspot.com/o/animes%2F${animeimgOr}?alt=media`;
    const fullurl2 = `https://firebasestorage.googleapis.com/v0/b/burgeranime-4a245.appspot.com/o/animes%2F${animeimgBack}?alt=media`;

    const newEpisode = {
      title: "No Episodes Yet!",
      nbrps: 0,
      epsimage: "demo-image.jpg",
      epsurl: "",
    };

    const animeData = {
      title: animeTitle,
      genres: selectedGenres,
      description: animeBio,
      imageUrl1: fullurl1,
      imageUrl2: fullurl2,
      rating: rating,
      format,
      seasonal: animeSes,
      eps: [newEpisode],
    };

    const createdAnime = await new Anime(animeData).save();

    return res.json({ message: "Anime Created Successfully!" });
  } catch (error) {
    console.error("Error creating anime:", error);
    return res.status(500).json({ message: "An error occurred while creating the anime." });
  }
});


router.post("/addEps", async (req, res) => {

  const { IDanime  , nbrps , epsimage , epsurl } = req.body;
  const AnimeUrl_img = `https://firebasestorage.googleapis.com/v0/b/burgeranime-4a245.appspot.com/o/animes%2Feps%2F${epsimage}?alt=media`;
  try {

    const animelist = await Anime.findById(IDanime);
    if (!animelist) { return res.json({message : "This Anime ID Not Exist in BURGERNAIME !"}) }

    const EpsanimeObj = {
      title : animelist.title,
      nbrps,
      epsimage : AnimeUrl_img,
      epsurl
    }

    animelist.eps[nbrps] = EpsanimeObj;
    // Save the updated anime
    await animelist.save();

    return res.json({message: "Anime Epesoide Addded successfully !!"});
    
  } catch (error) {
    console.log(error);
    res.json(error);
  }

});

module.exports = router;
