import axios from "axios";
import { useEffect, useState } from "react";
import "./calendar.css";

export default function CalendarView() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const slots = [
    "06:00", "07:00", "08:00", "09:00",
    "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00"
  ];

  useEffect(() => {
    const fetchSlots = () => {
      axios.get(`http://localhost:5000/api/slots/${date}`).then(res => {
        setBookedSlots(res.data);
      });
    };
    fetchSlots();
  }, [date]);

  const isBooked = (slot) => bookedSlots.find(b => b.slot.startsWith(slot));

  return (
    <div className="calendar">
      <h1>Court Availability: {date}</h1>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <div className="slot-grid">
        {slots.map(slot => {
          const booked = isBooked(slot);
          return (
            <div
              className={`slot ${booked ? "booked" : "available"}`}
              key={slot}
            >
              {slot}
              {booked && <span className="coach-tag">Coach</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
