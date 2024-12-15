const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authROutes");
const courseRoutes = require("./routes/courseRoutes");
// const leaderboardRoutes = require("./routes/leaderboardRoutes");
const gameRoutes = require("./routes/gameRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
// app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/courses", courseRoutes);

// Serve Frontend
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

// Database Connection
mongoose.connect("mongodb+srv://gaseous001:5IuLiL9mLtyZDa1v@cluster0.u6tzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Database Connection Failed:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
