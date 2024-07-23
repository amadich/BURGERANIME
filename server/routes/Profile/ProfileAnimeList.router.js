const express = require("express");
const router = express.Router();

const { GetFavAnimeList ,AddFavAnime , removeFavAnimeList } = require("../../controllers/ProfileAnimeList");

router.get("/profile/favAnimelist/:iduser", GetFavAnimeList);
router.post("/profile/favAnimelist/:idanime/:iduser", AddFavAnime);
router.post("/profile/removefavAnimelist/:idanime/:iduser", removeFavAnimeList);

module.exports = router;