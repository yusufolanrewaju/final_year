const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true }, // URL for the image
  banner: { type: String, required: true },   // URL for the banner
  price: { type: Number, default: 0 },        // Price in points
  modules: [
    {
      title: { type: String, required: true },
      files: [
        {
          title: { type: String, required: true },
          fileUrl: { type: String, required: true },
          duration: { type: Number, default: 0 }, // Duration in minutes
        },
      ],
    },
  ],
  totalDuration: { type: Number, default: 0 }, // Total duration in minutes
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "Uploader" },
});

module.exports = mongoose.model("Course", CourseSchema);
