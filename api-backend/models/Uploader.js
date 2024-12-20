const mongoose = require("mongoose");

const UploaderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: false },
  walletAddress: { type: String, required: false },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("Uploader", UploaderSchema);
