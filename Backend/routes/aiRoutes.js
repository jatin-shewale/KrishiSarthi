const express = require("express");
const router = express.Router();
const { chatWithAI } = require("../controllers/aiController");
// const { protect } = require('../middleware/authMiddleware'); // Un-comment if you want only logged-in users. Let's make it public for now.

router.post("/chat", chatWithAI);

module.exports = router;
