const express = require("express");
const Astrologer = require("../models/Astrologers");
const router = express.Router();

// Get all astrologers
router.get("/astrologers", async (req, res) => {
  try {
    const astrologers = await Astrologer.find();
    res.status(200).json(astrologers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
