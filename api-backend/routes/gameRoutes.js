const express = require("express");
const { updateScore } = require("../controllers/gameScoreController");

const router = express.Router();

router.post("/score", updateScore);

module.exports = router;
