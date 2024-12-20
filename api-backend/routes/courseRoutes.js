const express = require("express")
const { isAdmin, isAuthenticated, isAdminOrUser } = require("../utills/verifyToken");
const { addNewCourse, getAllCourses, deleteCourse, updateUserCourseProgress, updateCourseVideoUrl, updateCourseDetails, addComment, findCourse } = require("../controllers/courseController");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post("/new", isAdmin, upload.single('filename'), addNewCourse);

router.post("/newcomment/:cid", isAdminOrUser, addComment)

router.put("/update:cid", isAdmin, updateCourseDetails)

router.put('/video_url/:cid', isAdmin, updateCourseVideoUrl)

router.put('/usercourseprogress/update/:cid/:uid', updateUserCourseProgress)

router.get("/allCourse", isAdmin, getAllCourses)

router.get("/find/:cid", findCourse)

router.delete("/delete/:cid", isAdmin, deleteCourse)



module.exports = router