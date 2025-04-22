// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect("mongodb://localhost:27017/karnatakaStories", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Mongoose Schema & Model
// const storySchema = new mongoose.Schema({
//   title: String,
//   excerpt: String,
//   content: String,
//   authorName: String,
//   category: String,
//   imageUrl: String,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Story = mongoose.model("Story", storySchema);

// // POST route to submit a story
// app.post("/api/stories", async (req, res) => {
//   try {
//     const storyData = req.body;
//     const newStory = new Story(storyData);
//     await newStory.save();
//     res.status(201).json({ message: "Story submitted successfully" });
//   } catch (err) {
//     console.error("Error saving story:", err);
//     res.status(500).json({ message: "Failed to save story" });
//   }
// });

// // Optional: Get all stories
// app.get("/api/stories", async (req, res) => {
//   try {
//     const stories = await Story.find().sort({ createdAt: -1 });
//     res.json(stories);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch stories" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });

// SHARE YOUR EXPERIENCE

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
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

// Mongoose Schema & Model
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

// POST route to submit a story
app.post("/api/stories", async (req, res) => {
  try {
    const storyData = req.body;
    const newStory = new Story(storyData);
    await newStory.save();
    res.status(201).json(newStory); // ✅ return the new story
  } catch (err) {
    console.error("Error saving story:", err);
    res.status(500).json({ message: "Failed to save story" });
  }
});

// Optional: Get all stories
app.get("/api/stories", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stories" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
