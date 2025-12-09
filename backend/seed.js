const mongoose = require("mongoose");
const Court = require("./models/Court");
const Equipment = require("./models/Equipment");
require("dotenv").config();

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📌 Connected to MongoDB");

    // Clear and Seed Courts
    await Court.deleteMany();
    await Court.insertMany([
      { name: "Court 1", type: "indoor", basePrice: 300 },
      { name: "Court 2", type: "indoor", basePrice: 300 },
      { name: "Court 3", type: "outdoor", basePrice: 200 },
      { name: "Court 4", type: "outdoor", basePrice: 200 }
    ]);
    console.log("🌱 Courts seeded");

    // Clear and Seed Equipment
    await Equipment.deleteMany();
    await Equipment.create({ rackets: 20, shoes: 20 });
    console.log("🌱 Equipment seeded");

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 DB connection closed");
  }
}

seedData();
