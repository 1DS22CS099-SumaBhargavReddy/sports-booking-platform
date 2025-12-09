import React, { useEffect, useState } from "react";
import axios from "axios";
import "./history.css";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings").then(res => {
      setBookings(res.data);
    });
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("❗ Are you sure you want to cancel this booking?")) return;

    // fade animation
    document.getElementById(id).classList.add("removed");

    setTimeout(async () => {
      await axios.patch(`http://localhost:5000/api/bookings/${id}/cancel`);

      setBookings(bookings.filter((b) => b._id !== id));
      setToast("✔ Booking Cancelled Successfully");

      setTimeout(() => setToast(""), 2500);
    }, 400); // allow fade-out to finish
  };

  return (
    <div className="history-container">
      <h1 className="history-title">Booking History</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="history-list">
          {bookings.map((b) => (
            <div className="history-card" id={b._id} key={b._id}>
              <h2>{b.court?.name} ({b.court?.type.toUpperCase()})</h2>

              <p><b>Date:</b> {b.date || "N/A"}</p>
              <p><b>Slot:</b> {b.slot}</p>

              <p><b>Equipment:</b> 🎾 {b.resources.rackets} rackets | 👟 {b.resources.shoes} shoes</p>

              <p><b>Coach:</b> {b.resources.coach ? b.resources.coach.name : "None"}</p>

              <h3><b>Total Paid:</b> ₹{b.pricingBreakdown?.total}</h3>

              <p>
                Status: {b.status === "confirmed" ? "✔ Confirmed" : "⏳ Waitlisted"}
              </p>

              {b.status === "confirmed" && (
                <button className="cancel-btn" onClick={() => handleCancel(b._id)}>
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
