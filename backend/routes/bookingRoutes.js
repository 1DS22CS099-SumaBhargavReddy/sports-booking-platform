const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Court = require("../models/Court");
const Equipment = require("../models/Equipment");
const PricingRule = require("../models/PricingRule");
const Coach = require("../models/Coach");
const calculatePricing = require("../utils/priceCalculator");

// ======================================================
// GET ALL BOOKINGS
// ======================================================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("court", "name type")
      .populate("resources.coach", "name price");

    res.json(bookings);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// ======================================================
// CREATE BOOKING (FULL VALIDATION)
// ======================================================
router.post("/", async (req, res) => {
  try {
    const { court, slot, resources } = req.body;

    if (!slot) return res.status(400).json({ error: "Slot is required" });

    const normalizedSlot = slot.trim();
    const bookingDate = req.body.date || new Date().toISOString().split("T")[0];

    const courtDetails = await Court.findById(court);
    if (!courtDetails) return res.status(400).json({ error: "Court not found" });

    if (courtDetails.disabled)
      return res.status(400).json({ error: "Court is currently disabled" });

    // Extract hour from slot like "18:00 - 19:00"
    const slotHour = parseInt(normalizedSlot.split("-")[0].trim().split(":")[0]);
    const day = new Date(bookingDate).getDay();

    // Calculate equipment cost
    const equipmentCost = (resources.rackets * 20) + (resources.shoes * 30);

    // Calculate coach cost
    let coachCost = 0;
    if (resources.coach) {
      const coachDoc = await Coach.findById(resources.coach);

//       const todayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day];

//       // Validate coach availability
//       const allowed = coachDoc.availability.find(a => a.day === todayName);

//       if (resources.coach && (!allowed || !allowed.slots?.includes(normalizedSlot))) {
//   console.log("Coach availability mismatch");
//   return res.status(400).json({ error: "Selected coach not available for this slot" });
// }
// ======================================================
// COACH CONFLICT (ONLY double booking check)
// ======================================================
if (resources.coach) {
  const coachBusy = await Booking.findOne({
    "resources.coach": resources.coach,
    slot: normalizedSlot,
    date: bookingDate,
    status: "confirmed"
  });

  if (coachBusy) {
    return res.status(400).json({ error: "Coach already booked for this slot" });
  }
}


      coachCost = coachDoc?.price || 0;
    }

    // Pricing rules
    const rules = await PricingRule.find({ enabled: true });

    // Final price breakdown
    const breakdown = calculatePricing(
      courtDetails.basePrice,
      rules,
      courtDetails.type,
      slotHour,
      day,
      equipmentCost,
      coachCost
    );

    req.body.pricingBreakdown = breakdown;

    // ======================================================
    // COURT FULL → WAITLIST
    // ======================================================
    const existingCourtBookings = await Booking.countDocuments({
      court,
      slot: normalizedSlot,
      date: bookingDate,
      status: "confirmed"
    });

    if (existingCourtBookings >= 1) {
      const waitCount = await Booking.countDocuments({
        slot: normalizedSlot,
        date: bookingDate,
        status: "waitlist"
      });

      const waitEntry = await Booking.create({
        ...req.body,
        slot: normalizedSlot,
        date: bookingDate,
        status: "waitlist",
        waitlistPosition: waitCount + 1
      });

      return res.json({
        message: "⏳ Slot full – added to waitlist",
        waitlistPosition: waitEntry.waitlistPosition
      });
    }

// ======================================================
// COACH CONFLICT (Simplified – only checks double booking)
// ======================================================
if (resources.coach) {
  const coachBusy = await Booking.findOne({
    "resources.coach": resources.coach,
    slot: normalizedSlot,
    date: bookingDate,
    status: "confirmed"
  });

  if (coachBusy) {
    return res.status(400).json({ error: "Coach already booked for this slot" });
  }
}


    // ======================================================
    // EQUIPMENT STOCK CHECK
    // ======================================================
    const equipment = await Equipment.findOne();
    const sameSlotBookings = await Booking.find({
      slot: normalizedSlot,
      date: bookingDate,
      status: "confirmed"
    });

    let racketsUsed = 0, shoesUsed = 0;
    sameSlotBookings.forEach(b => {
      racketsUsed += b.resources.rackets;
      shoesUsed += b.resources.shoes;
    });

    if (racketsUsed + resources.rackets > equipment.rackets)
      return res.status(400).json({ error: "Not enough rackets available" });

    if (shoesUsed + resources.shoes > equipment.shoes)
      return res.status(400).json({ error: "Not enough shoes available" });

    // ======================================================
    // SAVE CONFIRMED BOOKING
    // ======================================================
    const newBooking = await Booking.create({
      ...req.body,
      slot: normalizedSlot,
      date: bookingDate,
      status: "confirmed"
    });

    res.json({ message: "🎉 Booking Confirmed", data: newBooking });

  } catch (error) {
    console.error("Booking Error:", error.message);
    res.status(500).json({ error: "Booking failed" });
  }
});

// ======================================================
// CANCEL BOOKING → PROMOTE WAITLIST
// ======================================================
router.patch("/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    await Booking.updateOne(
  { _id: booking._id },
  { $set: { status: "cancelled" } }
);

    booking.waitlistPosition = null;
    await booking.save();

    const slot = booking.slot;
    const date = booking.date;

    if (!slot || !date) {
      return res.json({ message: "Cancelled (no waitlist movement)" });
    }

    const next = await Booking.findOne({
      slot,
      date,
      status: "waitlist"
    }).sort("waitlistPosition");

    if (next) {
      next.status = "confirmed";
      next.waitlistPosition = null;
      await next.save();

      return res.json({
        message: "Cancelled → waitlist user promoted",
        promoted: next._id
      });
    }

    res.json({ message: "Booking cancelled" });

  } catch (error) {
    console.error("Cancel Error:", error.message);
    res.status(500).json({ error: "Cancellation failed" });
  }
});

module.exports = router;
