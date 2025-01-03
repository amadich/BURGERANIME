const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  ranks: { type: Object, required: true },
  favoriteAnime: [{ type: Schema.Types.ObjectId, ref: "animes" }],
  aboutme: { type: String },
  datecreate: { type: String },
  resetToken: { type: String }, // For password reset
  resetTokenExpiration: { type: Date }, // Expiration time for the reset token
});

const Usermodel = model("users", UserSchema);
module.exports = Usermodel;
