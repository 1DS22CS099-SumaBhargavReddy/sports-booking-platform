import BookingPage from "./pages/BookingPage";
import BookingHistory from "./pages/BookingHistory";
import AdminPricing from "./pages/AdminPricing";
import AdminResources from "./pages/AdminResources";
import CalendarView from "./pages/CalendarView";

import FloatingLines from "./pages/FloatingLines"; // 👈 ADD
import { useState } from "react";
import "./navbar.css"; 
import "./App.css"; // 👈 ADD (for layout styling)

function App() {
  const [page, setPage] = useState("booking");

  return (
    <div className="app-wrapper">

      {/* 🌈 Floating Animated Background */}
      <div className="background-anim">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[12, 18, 24]}
          lineDistance={[8, 6, 4]}
          animationSpeed={1.3}
          bendRadius={5}
          bendStrength={-0.6}
          interactive={true}
          parallax={true}
          mixBlendMode="screen"
          linesGradient={["#ff00ff", "#00eaff", "#8b00ff"]}
        />
      </div>

      {/* 📌 Foreground UI */}
      <div className="content-layer">
        
        {/* Glass Nav */}
        <nav className="navbar">
          <button
            className={`nav-btn ${page === "booking" ? "active" : ""}`}
            onClick={() => setPage("booking")}
          >
            Book Court
          </button>
          <button
            className={`nav-btn ${page === "history" ? "active" : ""}`}
            onClick={() => setPage("history")}
          >
            Booking History
          </button>
          <button
            className={`nav-btn ${page === "adminPricing" ? "active" : ""}`}
            onClick={() => setPage("adminPricing")}
          >
            Admin Pricing
          </button>
          <button
            className={`nav-btn ${page === "adminResources" ? "active" : ""}`}
            onClick={() => setPage("adminResources")}
          >
            Admin Resources
          </button>
          <button
            className={`nav-btn ${page === "calendar" ? "active" : ""}`}
            onClick={() => setPage("calendar")}
          >
            Calendar
          </button>
        </nav>

        {/* Route Rendering */}
        {page === "booking" && <BookingPage />}
        {page === "history" && <BookingHistory />}
        {page === "adminPricing" && <AdminPricing />}
        {page === "adminResources" && <AdminResources />}
        {page === "calendar" && <CalendarView />}
      </div>
    </div>
  );
}

export default App;
