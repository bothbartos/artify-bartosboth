import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ArtSchema = new Schema({
  title: String,
  date_start: Number,
  date_end: Number,
  description: String,
  short_description: String,
  medium_display: String,
  artwork_type: String,
  artwork_type_title: String,
  artist_title: String,
  image_id: String,
}, {
  timestamps: true,
});

export default model("Art", ArtSchema);