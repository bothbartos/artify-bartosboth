import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ArtModel from "./models/ArtModel.js";
import User from "./models/UserModel.js";
import "./models/CommentModel.js";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import UserModel from "./models/UserModel.js";
import CommentModel from "./models/CommentModel.js";

const PORT = 3000;

dotenv.config({ path: join(fileURLToPath(import.meta.url), "/../.env") });
const MongoURL = process.env.MONGO_URL;
const app = express();

app.use(express.json());

app.get("/api/pages/:page", async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize ?? 20);
    const pageNum = Number(req.params.page);
    const skipCount = (pageNum - 1) * pageSize;
    const pageItems = await ArtModel.find().sort("createdAt").skip(skipCount).limit(pageSize);
    res.json({ results: pageItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/filteredSearch/:page", async (req, res) => {
  try {
    const searchParams = req.query;
    const pageSize = Number(req.query.pageSize ?? 20);
    const pageNum = Number(req.params.page);
    const skipCount = (pageNum - 1) * pageSize;
    let query = ArtModel.find({});
    Object.entries(searchParams).forEach(([key, value]) => {
      query = query
        .find({ [key]: { $regex: value, $options: "i" } })
        .sort("createdAt")
        .skip(skipCount)
        .limit(pageSize)
        
    });
    console.log(searchParams);
    const filteredByField = await query;
    console.log(filteredByField);
    res.json(filteredByField);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/arts", async (req, res) => {
  const search = req.query.search;
  const regex = new RegExp(search, "i");

  try {
    const arts = await ArtModel.find({
      $or: [
        { title: regex },
        { medium_display: regex },
        { artwork_type: regex },
        { artwork_type_title: regex },
        { artist_title: regex },
      ],
    });

    return res.json(arts);
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
    const art = await ArtModel.findById(id).populate({path: "comments", populate: {path: 'author'}});
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
    const user = await User.findOne({ username: req.params.username }).populate("favorites");
    if (user === null) throw { message: "User not found" };
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  const { firstName: first_name, lastName: last_name, username } = req.body;
  try {
    const user = await User.create({
      first_name,
      last_name,
      username,
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.patch("/api/users/:id/favorite", async (req, res) => {
  const userId = req.params.id;
  const artworkId = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: artworkId.artworkId } },
      { new: true, upsert: false }
    ).populate("favorites");
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.patch("/api/users/:id/deleteFavorite", async (req, res) => {
  const userId = req.params.id;
  const artworkId = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {$pull: {favorites: artworkId.artworkId}},
      {new: true, upsert: false}
    ).populate("favorites");
    return res.send(updatedUser);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})

app.post("/api/artworks/:id/comment", async (req, res) => {
  const { userId, text } = req.body;
  const parentId = req.params.id;
  const comment = await CommentModel.create({
    author: userId,
    text,
  });
  await ArtModel.findByIdAndUpdate(parentId, {$push: {comments: comment._id}});
  res.sendStatus(201);
});

app.post("/api/comments/:id/reply", async (req, res) => {
  const { userId, text } = req.body;
  const parentId = req.params.id;
  const comment = await CommentModel.create({
    author: userId,
    text,
  });
  await CommentModel.findByIdAndUpdate(parentId, {$push: {replies: comment._id}});
  res.sendStatus(201);
});

app.get("/api/comments", async (req, res) => {
  const ids = req.query.ids?.split(',');
  let query = CommentModel.find();
  if (ids) query = query.find({_id: {$in: ids}});
  const comments = await query.populate("author");
  res.json(comments);
});


async function main() {
  await mongoose.connect(MongoURL);
  console.log("Connected to database.");

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
  });
}

main();
