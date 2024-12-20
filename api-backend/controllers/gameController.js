const User = require('../models/userModel'); // Assuming points are stored in User model

const updateGameScore = async (req, res) => {
  const { userId, category, score, attempts, level } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Points deduction based on level and attempts
    let deduction;
    if (level === 'easy') deduction = 10;
    else if (level === 'medium') deduction = 15;
    else if (level === 'hard') deduction = 25;

    const pointsLost = attempts * deduction;
    const pointsEarned = Math.max(score - pointsLost, 0);

    // Update user scores
    user.totalPoints += pointsEarned;
    user.scores[category] = (user.scores[category] || 0) + pointsEarned;

    await user.save();

    res.status(200).json({ message: "Score updated", user });

  } catch (error) {
    res.status(500).json({ message: "Error updating score", error });
  }
};

module.exports = { updateGameScore };
