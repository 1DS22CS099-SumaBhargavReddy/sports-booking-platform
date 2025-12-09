# 🏸 Badminton Court Booking Platform

A full-stack **badminton booking system** with:
- Court scheduling
- Waitlist auto-promotion
- Equipment rental tracking
- Coach availability management
- Admin pricing controls
- Animated UI dashboard
- Calendar booking view

---

## 🚀 Live Demo

| Service | URL |
|--------|-----|
| **Frontend (Vercel)** | https://YOUR-VERCEL-URL.vercel.app |
| **Backend (Render)** | https://sports-booking-platform-uh13.onrender.com |
| **MongoDB Atlas** | Cloud-hosted database |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Axios, Animated UI, FloatingLines background |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Render (Backend), Vercel (Frontend) |
| Styling | CSS Animations, Custom Components |
| Calendar | FullCalendar.js |
| Auth (optional future) | JWT / Google OAuth |

---

## 📂 Folder Structure'
```
sports-booking-platform/
│
├── backend/
│ ├── config/db.js
│ ├── routes/bookingRoutes.js
│ ├── models/
│ │ ├── Booking.js, Coach.js, Court.js, Equipment.js, PricingRule.js
│ ├── utils/priceCalculator.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── BookingPage.jsx, AdminPricing.jsx, CalendarView.jsx, ...
│ │ └── App.js
│ └── public/
│
└── README.md

```

---

## 🧠 Features

### 🏸 Court Booking
- Indoor & Outdoor courts
- Slot-based reservations
- Dynamic pricing (rush hours, weekends)

### 👥 Coach Assignment
- Time-slot availability validation
- Cannot double-book a coach

### 🛠 Equipment Rental
- Shoes & rackets tracking
- Stock-aware conflict prevention

### 🕒 Waitlist Auto-Promotion
If a confirmed booking cancels:
- Next waitlisted booking → upgraded automatically

### 📅 Calendar View
- Full daily court occupancy
- Color-coded status (Confirmed/Waitlist/Free)

### 🤖 Admin Panel
- Disable courts
- Change pricing rules
- Manage coach schedules
- Update equipment stock

### 🔥 UI Enhancements
- Hover animations
- Card glow effects
- Cancel fade-out transition
- Floating animated lines background

---

## ⚙️ Installation & Setup (Local)

```bash
git clone https://github.com/1DS22CS099-SumaBhargavReddy/sports-booking-platform.git
cd sports-booking-platform/backend
npm install
node server.js

File,Location,Content
.env,backend/,PORT=5000MONGO_URI=your_new_mongodb_atlas_connection_string
.env,frontend/,REACT_APP_API_URL=http://localhost:5000 (for local dev)

cd ../frontend
npm install
npm start

cd backend
node seed.js and node server.js
```
---

This will recreate:

Courts (4)

Coaches (1 default)

Equipment

Pricing rules
---
🚀 Deployment
Backend (Render)

Go to https://render.com

New Web Service → Select repo
```
Build command: npm install

Start command: node server.js
```
Add environment variable:
```
MONGO_URI

PORT=5000
```
Frontend (Vercel)

Go to https://vercel.com

Import GitHub repo

Environment Variable:
```
REACT_APP_API_URL=https://sports-booking-platform-uh13.onrender.com
```

---

Deploy

🛟 Troubleshooting
❌ DB Connection Failed

Fix:

Add Atlas IP Access: 0.0.0.0/0

Reset DB user password if leaked
---
🔥 Booking Always Fails

Ensure slot & date exist

Check coach availability matrix
---
⛓ Cors Error

Update backend:
```
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://YOUR-VERCEL-URL.vercel.app"
  ],
  credentials: true
}));
```
---

🔒 Security Notice

Credentials were rotated

.env removed from repo

DB now safe from public access

📌 Future Enhancements

Email / SMS booking confirmations

Razorpay/Stripe payment gateway

Login & role-based dashboard

Multi-sport support (Tennis, Cricket nets, Squash)
---

🧑‍💻 Author

Bhargav Reddy

GitHub: https://github.com/1DS22CS099-SumaBhargavReddy

LinkedIn: https://www.linkedin.com/in/kaipa-suma-bhargav-reddy/
---
