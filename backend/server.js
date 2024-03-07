import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ArtModel from "./models/ArtModel.js";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import User from "./models/User.js";

const PORT = 3000;

dotenv.config({ path: join(fileURLToPath(import.meta.url), "/../.env") });
const MongoURL = process.env.MONGO_URL;
const app = express();

app.use(express.json());

app.get("/api/pages/:page", async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize ?? 20);
    const pageNum = Number(req.params.page);
    const skipCount = (pageNum-1)*pageSize;
    const pageItems = await ArtModel.find()
    .sort('createdAt')
    .skip(skipCount)
    .limit(pageSize);
    res.json({results: pageItems});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/arts", async (req, res) => {
  const MAPPING = {
    artwork: "artwork_type_title",
    medium: "medium_display",
    artist: "artist_title",
  };
  try {
    const searchParams = {};
    for (const [oldName, newName] of Object.entries(MAPPING)) {
      if (req.query[oldName] !== undefined) {
        searchParams[newName] = req.query[oldName];
      }
    }

    const key = Object.keys(searchParams)[0];
    const value = Object.values(searchParams)[0];

    const filteredByField = await ArtModel.find({[`${key}`]: {$regex: value, $options: "i"}});
    console.log(filteredByField);
    res.json(filteredByField);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/api/arts/:id", async (req, res) => {
  try {
    const artToUpdate = await ArtModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );

    return res.json(artToUpdate);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete("/api/arts/:id", async (req, res) => {
  try {
    const artToDelete = await ArtModel.findByIdAndDelete(req.params.id);
    return res.json(artToDelete);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/arts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const art = await ArtModel.findById(id);
    return res.json(art);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/arts", async (req, res) => {
  const art = req.body;

  try {
    const createdArt = await ArtModel.create(art);
    return res.json(createdArt);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/users/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user === null) throw { message: "User not found" };
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  const { firstName: first_name, lastName: last_name, username } = req.body;
  try {
    const user = await User.create({ first_name, last_name, username, favorites: [] });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function main() {
  await mongoose.connect(MongoURL);
  console.log("Connected to database.");

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
  });
}

main();
