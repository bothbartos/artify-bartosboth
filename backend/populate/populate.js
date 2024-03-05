import mongoose from "mongoose";
import ArtModel from "../models/ArtModel.js";
import dotenv from "dotenv";
import {fileURLToPath} from "node:url";
import { dirname, join } from "node:path";


dotenv.config({path: join(dirname(fileURLToPath(import.meta.url)), "..", ".env")})


const MongoURL = process.env.MONGO_URL;


async function fetchData(){
  const response = await fetch("https://api.artic.edu/api/v1/artworks?fields=title,description,short_description,image_id,artist_title,artwork_type_title,medium_display,date_start,date_end");
  const data = await response.json();
  return data
}


async function populateArtModel() {
  const data = await fetchData();
  data.data.forEach(async (data) =>{
    await ArtModel.save(data)
  })
}

async function main() {
  mongoose.connect(MongoURL);

  await populateArtModel();

  await mongoose.disconnect();
}

main()