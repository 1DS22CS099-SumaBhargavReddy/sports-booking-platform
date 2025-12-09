const mongoose = require("mongoose");

const PricingRuleSchema = new mongoose.Schema({
  name: String,           // "Weekend", "Peak Hour", "Indoor Premium"
  type: String,           // weekend | peak | indoor
  multiplier: Number,     // for peak (e.g., 1.5)
  surcharge: Number,      // for weekend or indoor (e.g., 50)
  startHour: Number,      // peak start
  endHour: Number,        // peak end
  enabled: { type: Boolean, default: true },
  type: { type: String, enum: ["peak", "weekend", "indoor", "holiday"] },
  holidayDate: { type: String, required: false }

});

module.exports = mongoose.model("PricingRule", PricingRuleSchema);
