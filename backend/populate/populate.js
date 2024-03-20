import mongoose from "mongoose";
import ArtModel from "../models/ArtModel.js";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

dotenv.config({ path: join(fileURLToPath(import.meta.url), "/../../.env") });
const MongoURL = process.env.MONGO_URL;

async function fetchData(i) {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${i}&limit=1&fields=title%2Cdescription%2Cshort_description%2Cimage_id%2Cartist_title%2Cartwork_type_title%2Cmedium_display%2Cdate_start%2Cdate_end`
  );
  const data = await response.json();
  return data;
}

async function populateArtModel() {
  const data = await fetchData(15);
  for (const art of data.data) {
    await ArtModel.create(art);
  }
}

async function main() {
  await mongoose.connect(MongoURL);
  await populateArtModel();
  await mongoose.disconnect();
}

main();
