const express = require('express');
const { signupController, loginController, logout } = require('../controllers/authController');
const router = express.Router();

// Signup
router.post('/signup', signupController);
router.post('/login', loginController);
router.delete("/logout", logout)

module.exports = router
