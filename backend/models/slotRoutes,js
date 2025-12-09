const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.get("/:date", async (req, res) => {
  const { date } = req.params;

  const selectedDate = new Date(date).toDateString();

  const bookings = await Booking.find();

  const slots = bookings
    .filter(b => new Date(b.startTime).toDateString() === selectedDate)
    .map(b => ({
      slot: `${new Date(b.startTime).getHours()}:00`,
      court: b.court,
      coach: b.resources.coach
    }));

  res.json(slots);
});

module.exports = router;
