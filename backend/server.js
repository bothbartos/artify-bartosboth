import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ArtModel from "./models/ArtModel.js";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const PORT = 3000;

dotenv.config({ path: join(fileURLToPath(import.meta.url), "/../.env") });
const MongoURL = process.env.MONGO_URL;
const app = express();

// middleware
app.use(express.json());

app.get("/api/arts", async (req, res) => {
  try {
    const arts = await ArtModel.find({});
    res.json(arts)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.patch("/api/arts/:id", async (req, res) => {
  try {
    const artToUpdate = await ArtModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );

    res.json(artToUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/arts/:id", async (req, res) => {
  try {
    const artToDelete = await ArtModel.findByIdAndDelete(req.params.id);
    res.json(artToDelete);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

app.get("/api/arts/:id", async (req,res) => {
  const id = req.params.id
  try {
    const art = await ArtModel.findById(id);
    res.json(art)
  } catch (error) {
    res.status(500).json({ error:error.message })
  }
})
// POST - ADD NEW ART
app.post("/api/arts", async (req, res) => {
	const art = req.body;

	try {
		const createdArt = await ArtModel.create(art);
		return res.json(createdArt);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

async function main() {
	await mongoose.connect(MongoURL);;
  console.log("Connected to database.");

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}.`);
	});
}

main();
