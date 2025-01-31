const express = require("express");
const { allocateUsers } = require("../controllers/allocationController");

const router = express.Router();

// API Route to allocate users
router.post("/allocate", allocateUsers);

module.exports = router;
