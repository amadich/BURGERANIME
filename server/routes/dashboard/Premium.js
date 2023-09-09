const express = require("express");
const Anime = require("../../models/Schemas/AnimeSchema");
const router = express.Router();

router.put("/premium_anime", async (req,res) => {

   const { IDanime } = await req.body;

   try {
      
      const setanime = await Anime.findById(IDanime);
      if (!setanime) { return res.json({message : "This Anime ID Not Exist in BURGERNAIME !"}) }

      setanime.premium = 1;
      await setanime.save();

      return res.json({message: "Anime Addded Premium successfully !!"});


   } catch (error) {
      console.log(error);
      return res.json({error})
   }

});


router.put("/unpremium_anime", async (req,res) => {

   const { IDanime } = await req.body;

   try {
      
      const setanime = await Anime.findById(IDanime);
      if (!setanime) { return res.json({message : "This Anime ID Not Exist in BURGERNAIME !"}) }

      setanime.premium = 0;
      await setanime.save();

      return res.json({message: "Anime UnPremium successfully !!"});


   } catch (error) {
      console.log(error);
      return res.json({error})
   }

})

module.exports = router;