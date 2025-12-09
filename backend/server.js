const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connect
connectDB();

// Routes
app.use("/api/slots", require("./routes/slotRoutes"));
app.use("/api/courts", require("./routes/courtRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/coaches", require("./routes/coachRoutes"));
app.use("/api/equipment", require("./routes/equipmentRoutes"));
app.use("/api/pricing", require("./routes/pricingRoutes"));
app.use("/api/pricing", require("./routes/pricingRoutes"));

app.get("/", (req, res) => {
  res.send("Sports Booking Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
