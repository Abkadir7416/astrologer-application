const User = require("../models/Users");
const Astrologer = require("../models/Astrologers");
const FlowDistributor = require("../services/flowDistributor");

const allocateUsers = async (req, res) => {
  try {
    const users = req.body.users;
    if (!users || !Array.isArray(users)) {
      return res.status(400).json({ error: "Invalid user input" });
    }

    const astrologers = await Astrologer.find();
    console.log('astrologers: ', astrologers);
    const distributor = new FlowDistributor(astrologers);
    console.log('distributor: ', distributor);
    const output = await distributor.distributeUsers(users);
    console.log('output: ', output);

    res.json({ message: "Users allocated successfully", astrologers });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = { allocateUsers };
