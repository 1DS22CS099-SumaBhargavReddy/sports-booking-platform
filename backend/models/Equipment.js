const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  rackets: Number,
  shoes: Number,
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
