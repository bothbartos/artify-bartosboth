import mongoose from "mongoose";

const { Schema, model } = mongoose;

const User = new Schema({
  first_name: String,
  last_name: String,
  username: {type: String, unique: true},
  favorites: [{type: Schema.Types.ObjectId, ref: "Art"}],
});

export default model("User", User);