const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/karnatakaStories", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Story Schema (unchanged)
const storySchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  authorName: String,
  category: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Story = mongoose.model("Story", storySchema);

app.post("/api/stories", async (req, res) => {
  try {
    const storyData = req.body;
    const newStory = new Story(storyData);
    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    console.error("Error saving story:", err);
    res.status(500).json({ message: "Failed to save story" });
  }
});

app.get("/api/stories", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stories" });
  }
});

const travelBuddySchema = new mongoose.Schema({
  user: {
    name: String,
    avatar: String,
    age: Number,
    gender: String,
    email: String,
  },
  destination: String,
  fromDate: Date,
  toDate: Date,
  interests: [String],
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TravelBuddy = mongoose.model("TravelBuddy", travelBuddySchema);

// Routes
app.post("/api/buddy", async (req, res) => {
  try {
    const newBuddy = new TravelBuddy(req.body);
    await newBuddy.save();
    res.status(201).json(newBuddy);
  } catch (err) {
    console.error("Error saving buddy:", err);
    res.status(500).json({ message: "Failed to save buddy" });
  }
});

app.get("/api/buddy", async (req, res) => {
  try {
    const buddies = await TravelBuddy.find().sort({ createdAt: -1 });
    res.json(buddies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch buddies" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
