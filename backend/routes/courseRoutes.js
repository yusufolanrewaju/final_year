const express = require("express");
const multer = require("multer");
const Course = require("../models/course");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Save files in the uploads folder
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Route to upload a course
router.post("/upload", upload.fields([{ name: "thumbnail" }, { name: "banner" }]), async (req, res) => {
  const { title, description, category, price, modules } = req.body;
  const { thumbnail, banner } = req.files;

  try {
    const course = new Course({
      title,
      description,
      category,
      thumbnail: thumbnail[0].path,
      banner: banner[0].path,
      price,
      modules: JSON.parse(modules), // Parse modules from the frontend
    });

    // Calculate total duration
    course.totalDuration = course.modules.reduce(
      (acc, module) =>
        acc +
        module.files.reduce((fileAcc, file) => fileAcc + file.duration, 0),
      0
    );

    await course.save();
    res.json({ message: "Course uploaded successfully", course });
  } catch (error) {
    res.status(500).json({ error: "Error uploading course", details: error });
  }
});

// Route to fetch all courses
router.get("/", async (req, res) => {
    try {
      const courses = await Course.find().populate("uploader", "username");
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Error fetching courses", details: error });
    }
  });
  

module.exports = router;
