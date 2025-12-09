const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  court: { type: mongoose.Schema.Types.ObjectId, ref: "Court" },
  slot: { type: String, required: true }, // 👈 MUST EXIST
  date: { type: String, default: new Date().toISOString().split("T")[0] },
  userName: String,

  resources: {
    rackets: { type: Number, default: 0 },
    shoes: { type: Number, default: 0 },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: "Coach" }
  },

  pricingBreakdown: {
    basePrice: Number,
    peakHourFee: Number,
    weekendFee: Number,
    indoorFee: Number,
    coachFee: Number,
    equipmentFee: Number,
    total: Number
  },

  status: { 
    type: String, 
    enum: ["confirmed", "cancelled", "waitlist"], 
    default: "confirmed" 
  },

  waitlistPosition: Number
});

// 👇 prevents duplicate same court + slot + date confirmed bookings
BookingSchema.index(
  { court: 1, slot: 1, date: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "confirmed" } }
);

module.exports = mongoose.model("Booking", BookingSchema);
