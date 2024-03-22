import mongoose from "mongoose";
import ArtModel from "../models/ArtModel.js";
import UserModel from "../models/UserModel.js";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import CommentSchema from "../models/CommentModel.js";

dotenv.config({ path: join(fileURLToPath(import.meta.url), "/../../.env") });
const MongoURL = process.env.MONGO_URL;

async function fetchData(i) {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${i}&limit=12&fields=title%2Cdescription%2Cshort_description%2Cimage_id%2Cartist_title%2Cartwork_type_title%2Cmedium_display%2Cdate_start%2Cdate_end`
  );
  const data = await response.json();
  return data;
}

async function getPage(i) {
  const arts = (await fetchData(i)).data;
  console.log(arts.map(art => art.title));
  const promises = arts.map(art => ArtModel.create({...art}));
  return Promise.all(promises)
}

async function populateArtModel(numberOfPages=10) {
  await ArtModel.deleteMany({});
  const pagePromises = [];
  for (let i=0; i<numberOfPages; i++) {
    pagePromises.push(getPage(i));
  };
  await Promise.all(pagePromises);
}

async function populateUserModel() {
  await UserModel.deleteMany({});
  await UserModel.create({
    username: 'admin',
    first_name: 'Ad',
    last_name: 'min',
    isAdmin: true,
    favorites: [],
  });
}

async function deleteComments() {
  await CommentSchema.deleteMany({});
}

async function main() {
  await mongoose.connect(MongoURL);
  await populateArtModel();
  await populateUserModel();
  await deleteComments();
  await mongoose.disconnect();
}

main();
