const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");

// GET inventory
router.get("/", async (req, res) => {
  try {
    const items = await Equipment.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
});

// SET inventory / update
router.post("/", async (req, res) => {
  try {
    const item = await Equipment.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to add equipment" });
  }
});
// Update equipment stock
router.put("/:id", async (req, res) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update equipment" });
  }
});

module.exports = router;
