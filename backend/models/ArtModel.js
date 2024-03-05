import mongoose from "mongoose";

const { Schema } = mongoose;

const ArtSchema = new Schema({
  title: String,
  date_start: Number,
  date_end: Number,
  description: String,
  short_description: String,
  medium_display: String,
  artwork_type: String,
  artist: String,
  image_id: String
});

export default ("Art", ArtSchema);