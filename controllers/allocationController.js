const User = require("../models/Users");
const Astrologer = require("../models/Astrologers");
const FlowDistributor = require("../services/flowDistributor");

const allocateUsers = async (req, res) => {
  try {
    const users = req.body;
    if (!users || !Array.isArray(users)) {
      return res.status(400).json({ error: "Invalid user input, users fields are required" });
    }

    const astrologers = await Astrologer.find();
    const distributor = new FlowDistributor(astrologers);
    const output = await distributor.distributeUsers(users);

    res.json({ message: "Users allocated successfully", astrologers });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = { allocateUsers };
