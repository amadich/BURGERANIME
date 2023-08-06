const { Schema , model } = require("mongoose");
const FavoriteAnime = require("./AnimeSchema");
const UserSchema = Schema({
   username : {type : String , required : true},
   email : {type : String , required : true , unique : true},
   password : {type : String , required : true},
   avatar : {type: String , required : true},
   ranks : {type : Object , required : true},
   favoriteAnime: { type: Schema.Types.ObjectId, ref: "FavoriteAnime" },
   aboutme: {type : String},
   datecreate : {type : String}
})

const Usermodel = model("users", UserSchema);
module.exports = Usermodel;