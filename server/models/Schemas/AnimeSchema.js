// models/AnimeSchema.js
const { Schema, model } = require("mongoose");

const SystemLikeUserSchema = Schema({
  userID: { type: String },
  HeLiked: { type: Boolean },
  HeDesLiked: { type: Boolean },
});

const EpisodeSchema = Schema({
  title: { type: String },
  nbrps: { type: Number },
  epsimage: { type: String },
  epsurl: { type: String },
  SystemLikeUser: [SystemLikeUserSchema], // Corrected field name here
  Likes: { type: Object }, // Like: Number & DesLike: Number
});

const AnimeSchema = Schema({
  title: { type: String, required: true },
  genres: [{ type: String }], // Storing genres as an array of strings
  description: { type: String, required: true },
  imageUrl1: { type: String, required: true },
  imageUrl2: { type: String, required: true },
  rating: { type: Number },
  format: { type: Object, required: true },
  seasonal: { type: Number },
  premium: { type: Number },
  by_admin: { type: Object },
  eps: [EpisodeSchema],
  // Add other fields specific to anime data as needed
});

const Anime = model("animes", AnimeSchema);
module.exports = Anime;
