require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// ================= DB CONNECT =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ================= ROUTES =================
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");
const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/admin");

// 🔥 NEW (IMPORTANT)
const notifyRoutes = require("./routes/notify");

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

// 🔥 ADD THIS LINE
app.use("/api/notify", notifyRoutes);

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("🚀 Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});