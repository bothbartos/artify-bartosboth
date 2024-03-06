import mongoose from "mongoose";

const { Schema, model } = mongoose;

const User = new Schema({
  first_name: String,
  last_name: String,
  username: {type: String, unique: true},
  favorites: [String],
});

export default model("User", User);