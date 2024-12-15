const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Update Score
router.post("/update-score", async (req, res) => {
  const { userId, score } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.score += score;
    await user.save();

    res.json({ message: "Score updated successfully", totalScore: user.score });
  } catch (error) {
    res.status(500).json({ error: "Error updating score", details: error });
  }
});

// Fetch Leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leaderboard", details: error });
  }
});

module.exports = router;
