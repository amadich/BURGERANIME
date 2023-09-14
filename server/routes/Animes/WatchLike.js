const express = require("express");
const Anime = require("../../models/Schemas/AnimeSchema");
const router = express.Router();

router.post('/watchlike/:IDanime/:IDeps', async (req, res) => {
  const { IDanime, IDeps } = req.params;
  const { IDuser, Like, DesLike } = req.body;

  try {
    const anime = await Anime.findById(IDanime);
    if (!anime) {
      return res.status(404).json({ error: 'Anime not found' });
    }

    const episode = anime.eps.find(ep => ep._id == IDeps);
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    const searchUserLikes = episode.SystemLikeUser.find(user => user.userID == IDuser);

    // Check if GetLikesEpisode is defined before accessing its properties
    const GetLikesEpisode = episode.Likes || { HeLiked: 0, HeDesLiked: 0 };

    if (!searchUserLikes) {
      // User not found, create a new entry
      const createUserLikes = {
        userID: IDuser,
        HeLiked: Like,
        HeDesLiked: DesLike
      };
      episode.SystemLikeUser.push(createUserLikes);

      // Update Likes for a new user
      const Likes = {
        HeLiked: GetLikesEpisode.HeLiked + (Like ? 1 : 0),
        HeDesLiked: GetLikesEpisode.HeDesLiked + (DesLike ? 1 : 0)
      };
      episode.Likes = Likes;
    } else {
      // User found, update the existing entry
      searchUserLikes.HeLiked = Like;
      searchUserLikes.HeDesLiked = DesLike;

      // Update Likes for an existing user
      const Likes = {
        HeLiked: GetLikesEpisode.HeLiked + (Like ? 1 : -1),
        HeDesLiked: GetLikesEpisode.HeDesLiked + (DesLike ? 1 : -1)
      };
      episode.Likes = Likes;
    }

    // Save the episode after making changes
    await episode.save({ suppressWarning: true });

    // Save the anime (if needed) after updating the episode
    await anime.save({ suppressWarning: true });

    return res.json({ message: "User Updated Likes ANIME!!", searchUserLikes });

  } catch (error) {
    console.error(error);
    return res.json({ error });
  }
});

module.exports = router;
