const express = require("express");
const FlowDistributor = require("../services/flowDistributor");
const Astrologer = require("../models/Astrologers");
const auth = require("../middlewares/auth");


const router = express.Router();

router.post("/allocate", auth, async (req, res) => {
  try {
    const astrologers = await Astrologer.find();
    const distributor = new FlowDistributor(astrologers);

    const allocatedAstrologers = await distributor.distributeUsers(req.body.users);
    res.json({ message: "Users allocated successfully", astrologers: allocatedAstrologers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
