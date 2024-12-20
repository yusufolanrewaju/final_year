const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup
exports.signupController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Encrypt Password
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login
exports.loginController = async (req, res) => {
  const { email, password, } = req.body;

  try {
    const user = await User.findOne({ email }) || await User.findOne({ walletAddress });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Validate Password
    if (password && !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const { _id, role } = user
    // Generate Token
    const token = jwt.sign({ id: user._id, email, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("gamified", token);
    res.json({ message: "Login successful", token, _id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie('gamified', { path: '/' });
  res.json({ msg: "logout successful" })
}