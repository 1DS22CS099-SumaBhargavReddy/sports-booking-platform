const express = require("express");
const router = express.Router();
const PricingRule = require("../models/PricingRule");

// Get all rules
router.get("/", async (req, res) => {
  const rules = await PricingRule.find();
  res.json(rules);
});

// Add new rule
router.post("/", async (req, res) => {
  const rule = await PricingRule.create(req.body);
  res.json(rule);
});

// Update rule
router.put("/:id", async (req, res) => {
  const updated = await PricingRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Enable/Disable rule
router.patch("/:id/toggle", async (req, res) => {
  const rule = await PricingRule.findById(req.params.id);
  rule.enabled = !rule.enabled;
  await rule.save();
  res.json(rule);
});

module.exports = router;
