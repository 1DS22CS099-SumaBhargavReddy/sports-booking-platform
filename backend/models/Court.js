const mongoose = require("mongoose");

const CourtSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["indoor", "outdoor"] },
  basePrice: Number,
  disabled: { type: Boolean, default: false } // 👈 final correct key
});

module.exports = mongoose.model("Court", CourtSchema);
