const express = require("express");
const multer = require("multer");
const router = express.Router();

// Set up storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Files will be saved in the uploads/ folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Route: Handle Course Upload
router.post(
    "/upload-course",
    upload.fields([
        { name: "courseThumbnail", maxCount: 1 },
        { name: "courseBanner", maxCount: 1 },
        { name: "files" },
    ]),
    (req, res) => {
        try {
            const {
                courseTitle,
                courseDescription,
                subSectionTitle,
                fileTitle,
                coursePrice,
            } = req.body;

            const courseThumbnail = req.files["courseThumbnail"][0];
            const courseBanner = req.files["courseBanner"][0];
            const files = req.files["files"];

            // Example response with course details
            res.status(200).json({
                message: "Course uploaded successfully!",
                courseDetails: {
                    courseTitle,
                    courseDescription,
                    coursePrice: coursePrice || "Free",
                    thumbnailPath: courseThumbnail.path,
                    bannerPath: courseBanner.path,
                    files: files.map((file, index) => ({
                        title: fileTitle[index],
                        path: file.path,
                    })),
                    subSections: subSectionTitle,
                },
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to upload course", error });
        }
    }
);

module.exports = router;
