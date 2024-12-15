const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Assuming 'User' includes both consumers and uploaders
// const { signupContract, loginContract } = require("../blockchain/blockchain.js"); // Assuming blockchain.js exports your contracts

const router = express.Router();

// JWT Secret
const JWT_SECRET = "79057cf1311f3c481848615cd1239e14d1e3cc9944591f52bf21a3496e1d35f23507a741302e7c3230b6b134104b58ce989857a96bd975759a0138299bbfac4fd3a2a91654d875013b1e25b5af1c97ca41d78cd21e1f4e6008b244038a38b913a1b9863d5a38d9653b97cec30b1eefbf9717d7ca1e2ee56527f005a2961da3e1fdb1a4318d5afbaf8ddc191b8c85f54ec1f4e86fb1f0006e4227f67bdc99dd6d7cfe8ea37acec04ca7222dbc2124fb483a988256feecea4e86c9b057526fe6ebdd45d0d8f77e8a68a7b9cb353a24de228e3326dbbaa6057e0379c26c9b29cdf45f10001b027e66001beb3c74b1b9e13d391a1b6ca5b66f884f9bf5ed7915be50";

// Consumer Signup
router.post("/consumer/signup", async (req, res) => {
  const { username, email, walletAddress } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      walletAddress,
      role: "consumer", // Specify role
    });
    await newUser.save();

    // Store consumer on blockchain
    if (walletAddress) {
      await signupContract.methods.registerConsumer(walletAddress).send({ from: walletAddress });
    }

    res.json({ message: "Consumer signed up successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error during signup", details: error.message });
  }
});

// Uploader Signup
router.post("/uploader/signup", async (req, res) => {
  const { username, email, walletAddress } = req.body;

  try {
    const newUploader = new User({
      username,
      email,
      walletAddress,
      role: "uploader", // Specify role
    });
    await newUploader.save();

    // Store uploader on blockchain
    if (walletAddress) {
      await signupContract.methods.registerUploader(walletAddress).send({ from: walletAddress });
    }

    res.json({ message: "Uploader signed up successfully", user: newUploader });
  } catch (error) {
    res.status(500).json({ error: "Error during signup", details: error.message });
  }
});

// Login Route (Shared for Consumer and Uploader)
router.post("/login", async (req, res) => {
  const { email, walletAddress } = req.body;

  try {
    // Find user by email or wallet address
    const user = await User.findOne({ $or: [{ email }, { walletAddress }] });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.email,
        walletAddress: user.walletAddress,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error during login", details: error.message });
  }
});

module.exports = router;
