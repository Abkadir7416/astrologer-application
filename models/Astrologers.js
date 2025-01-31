const mongoose = require("mongoose");

const AstrologerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priorityFactor: { type: Number, default: 1 },
  allocatedUsers: { type: Number, default: 0 },
});

module.exports = mongoose.model("Astrologer", AstrologerSchema);
