const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: false },
  walletAddress: { type: String, required: false },
  score: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
