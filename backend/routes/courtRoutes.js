const express = require("express");
const router = express.Router();
const Court = require("../models/Court");

// Get courts
router.get("/", async (req, res) => {
  const courts = await Court.find();
  res.json(courts);
});

// Disable / Enable court
router.patch("/:id/toggle", async (req, res) => {
  const court = await Court.findById(req.params.id);
  court.disabled = !court.disabled;
  await court.save();
  res.json(court);
});

module.exports = router;
