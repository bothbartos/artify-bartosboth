import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: {type: String, unique: true},
  isAdmin: Boolean,
  favorites: [{type: Schema.Types.ObjectId, ref: "Art"}],
});

export default model("User", UserSchema);