import React, { useEffect, useState } from "react";
import axios from "axios";
import "./booking.css";

const TIME_SLOTS = [
  "06:00 - 07:00",
  "07:00 - 08:00",
  "08:00 - 09:00",
  "09:00 - 10:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00"
];

export default function BookingPage() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [rackets, setRackets] = useState(0);
  const [shoes, setShoes] = useState(0);

  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");

  const [priceDetails, setPriceDetails] = useState({
    base: 0,
    equipment: 0,
    coach: 0,
    peak: 0,
    weekend: 0,
    indoor: 0,
    total: 0,
  });
  const [date, setDate] = useState("");

  const [message, setMessage] = useState("");

  // Load courts & coaches
  useEffect(() => {
    axios.get("http://localhost:5000/api/courts").then(res => setCourts(res.data));
    axios.get("http://localhost:5000/api/coaches").then(res => setCoaches(res.data));
  }, []);

  // Recalculate price when selection changes
  useEffect(() => {
    if (!selectedCourt || !selectedSlot) return;

    const court = courts.find(c => c._id === selectedCourt);
    let base = court.basePrice;

    const slotHour = parseInt(selectedSlot.split(":")[0]);
    const today = new Date();
    const day = today.getDay(); // 0 Sunday, 6 Saturday

    let peak = slotHour >= 18 && slotHour < 21 ? base * 0.5 : 0;
    let weekend = (day === 0 || day === 6) ? 50 : 0;
    let indoor = court.type === "indoor" ? 40 : 0;

    let equipment = rackets * 20 + shoes * 30;
    let coach = selectedCoach ? (coaches.find(c => c._id === selectedCoach)?.price || 0) : 0;

    let total = base + peak + weekend + indoor + equipment + coach;

    setPriceDetails({
      base,
      peak,
      weekend,
      indoor,
      equipment,
      coach,
      total,
    });
  }, [selectedSlot, selectedCourt, rackets, shoes, selectedCoach, courts, coaches]);

  const handleBooking = async () => {
  if (!selectedCourt || !selectedSlot) {
    setMessage("Please select a court & slot!");
    return;
  }

  const bookingData = {
    court: selectedCourt,
    slot: selectedSlot.trim(), // 👈 ensure sent properly
    date: new Date().toISOString().split("T")[0], 
    resources: {
      rackets,
      shoes,
      coach: selectedCoach || null
    },
    pricingBreakdown: priceDetails
  };

  try {
    await axios.post("http://localhost:5000/api/bookings", bookingData);
    setMessage("🎉 Booking Confirmed!");
  } catch (error) {
    setMessage("❌ " + (error.response?.data?.error || "Booking failed"));
  }
};


  return (
    <div className="container">
      <h1 className="title">Sports Facility Court Booking Platform</h1>
      <h2 className="subtitle">Select Date</h2>
<input
  type="date"
  className="date-picker"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  min={new Date().toISOString().split("T")[0]} // blocks past dates
/>

      <h2 className="subtitle">Select Court</h2>
      <div className="court-list">
        {courts.map(court => (
          <div
            key={court._id}
            className={`court-card ${selectedCourt === court._id ? "selected" : ""}`}
            onClick={() => setSelectedCourt(court._id)}
          >
            <h2>{court.name}</h2>
            <p>Type: {court.type}</p>
            <p>Base Price: ₹{court.basePrice}</p>
            {court.disabled && <p className="disabled-tag">Court Disabled</p>}
          </div>
        ))}
      </div>

      <h2 className="subtitle">Select Time Slot</h2>
      <div className="slots">
        {TIME_SLOTS.map(slot => (
          <div
            key={slot}
            className={`slot ${selectedSlot === slot ? "selected" : ""}`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </div>
        ))}
      </div>

      <h2 className="subtitle">Add Equipment</h2>
      <div className="equipment">
        <div className="equip-item">
          <span>Rackets</span>
          <div className="controls">
            <button onClick={() => setRackets(r => Math.max(0, r - 1))}>-</button>
            <span>{rackets}</span>
            <button onClick={() => setRackets(r => r + 1)}>+</button>
          </div>
        </div>

        <div className="equip-item">
          <span>Shoes</span>
          <div className="controls">
            <button onClick={() => setShoes(s => Math.max(0, s - 1))}>-</button>
            <span>{shoes}</span>
            <button onClick={() => setShoes(s => s + 1)}>+</button>
          </div>
        </div>
      </div>

      <h2 className="subtitle">Select Coach (Optional)</h2>
      <select
        className="coach-dropdown"
        value={selectedCoach}
        onChange={(e) => setSelectedCoach(e.target.value)}
      >
        <option value="">No Coach</option>
        {coaches.map(coach => (
          <option key={coach._id} value={coach._id}>
            {coach.name} (₹{coach.price})
          </option>
        ))}
      </select>

      <h2 className="subtitle">Price Breakdown</h2>
      <div className="price-box">
        <p>Base Price: ₹{priceDetails.base}</p>
        <p>Peak Hour Fee: ₹{priceDetails.peak}</p>
        <p>Weekend Fee: ₹{priceDetails.weekend}</p>
        <p>Indoor Court Fee: ₹{priceDetails.indoor}</p>
        <p>Equipment Fee: ₹{priceDetails.equipment}</p>
        <p>Coach Fee: ₹{priceDetails.coach}</p>
        <hr />
        <p className="total">Total: ₹{priceDetails.total}</p>
      </div>

      <button className="confirm-btn" onClick={handleBooking}>
        Confirm Booking
      </button>

      {message && <p className="confirmation">{message}</p>}
    </div>
  );
}
