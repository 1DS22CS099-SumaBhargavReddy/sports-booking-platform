const express = require("express");
const router = express.Router();
const Coach = require("../models/Coach");

// Get all coaches
router.get("/", async (req, res) => {
  const coaches = await Coach.find();
  res.json(coaches);
});

// Add coach
router.post("/", async (req, res) => {
  const coach = await Coach.create(req.body);
  res.json(coach);
});

// Update coach availability or price
router.put("/:id", async (req, res) => {
  const updated = await Coach.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete coach
router.delete("/:id", async (req, res) => {
  await Coach.findByIdAndDelete(req.params.id);
  res.json({ message: "Coach removed" });
});

module.exports = router;
