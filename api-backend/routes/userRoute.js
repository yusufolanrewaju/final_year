const express = require("express");
const { isAuthenticated, isAdmin } = require("../utills/verifyToken");
const { getUserById, getAllUsers, updateUserPoint, updateUserProfile, updateUserProfilePic, getLeaderboard } = require("../controllers/userController");
const multer = require('multer');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/profile/:uid", isAuthenticated, getUserById)
router.get("/all", getAllUsers)
router.get("/leadersboard", getLeaderboard)

// Update user Profile Data

router.put("/profile/update/:uid", isAuthenticated, updateUserProfile)
router.put("/profile/updatepoint/:uid", isAuthenticated, updateUserPoint)
router.put("/profilepic/update/:uid", isAuthenticated, upload.single('pic'), updateUserProfilePic)

module.exports = router