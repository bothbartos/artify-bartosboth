import mongoose from "mongoose";
import ArtModel from "../models/ArtModel.js";
import dotenv from "dotenv";
import {fileURLToPath} from "node:url";
import { join } from "node:path";

dotenv.config({path: join(fileURLToPath(import.meta.url), "/../../.env")});
const MongoURL = process.env.MONGO_URL;

async function fetchData(i){
 
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${i}?fields=title,description,short_description,image_id,artist_title,artwork_type_title,medium_display,date_start,date_end`);
      const data = await response.json();
      return data;
}

async function populateArtModel() {
  for(let i = 1; i <= 10; i++) {
    const data = await fetchData(i);
    for (const art of data.data) {
      await ArtModel.create(art);
      console.log("fasz");
    }

  }
}

async function main() {
  await mongoose.connect(MongoURL);
  await populateArtModel();
  await mongoose.disconnect();
}

main()