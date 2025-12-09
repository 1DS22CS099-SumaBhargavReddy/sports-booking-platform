const mongoose = require("mongoose");

const CoachSchema = new mongoose.Schema({
  name: String,
  price: Number,
  availability:  [{ day: String, slots: [String] }]
});

module.exports = mongoose.model("Coach", CoachSchema);
