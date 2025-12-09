const mongoose = require("mongoose");
const PricingRule = require("./models/PricingRule");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await PricingRule.deleteMany();
  await PricingRule.insertMany([
    { name: "Peak Hours", type: "peak", start: 18, end: 21, multiplier: 1.5, enabled: true },
    { name: "Weekend", type: "weekend", surcharge: 50, enabled: true },
    { name: "Indoor Premium", type: "indoor", surcharge: 40, enabled: true }
  ]);

  console.log("🌱 Pricing rules seeded");
  mongoose.connection.close();
});
