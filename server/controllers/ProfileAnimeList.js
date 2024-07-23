const express = require("express");

const Anime = require("../models/Schemas/AnimeSchema");
const User = require("../models/Schemas/UsersSchema");

const GetFavAnimeList = async (req, res) => {
    const { iduser } = req.params;

    const user = await User.findById(iduser).populate("favoriteAnime");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.favoriteAnime);
};

const AddFavAnime = async (req, res) => {
   const { idanime, iduser } = req.params;
 
   const anime = await Anime.findById(idanime);
   if (!anime) return res.status(404).json({ message: "Anime not found" });
 
   const user = await User.findById(iduser);
   if (!user) return res.status(404).json({ message: "User not found" });
 
   if (!user.favoriteAnime) {
     user.favoriteAnime = [];
   }
 
   user.favoriteAnime.push(anime._id); // Push the anime ID, not the whole document
   await user.save();
   res.json(user);
 };
 
   

const removeFavAnimeList =  async (req, res) => {

   const { idanime, iduser } = req.params;

   const anime = await Anime.findById(idanime);
   if (!anime) return res.status(404).json({ message: "Anime not found" });

   const user = await User.findById(iduser);
   if (!user) return res.status(404).json({ message: "User not found" });

   user.favoriteAnime = user.favoriteAnime.filter((anime) => anime._id != idanime);
   await user.save();
   res.json(user);

};

module.exports = { GetFavAnimeList ,AddFavAnime, removeFavAnimeList };