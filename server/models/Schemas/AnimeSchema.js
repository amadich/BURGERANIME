// models/AnimeSchema.js
const { Schema, model } = require("mongoose");

const AnimeSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  releaseDate: { type: Date },
  genre: { type: String },
  rating: { type: Number },
  // Add other fields specific to anime data as needed
});

const Anime = model("Animes", AnimeSchema);
module.exports = Anime;
