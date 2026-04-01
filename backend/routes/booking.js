const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const { auth, verifyAdmin } = require("../middleware/auth");

// ==========================
// 👤 USER ROUTES
// ==========================

// ✅ CREATE BOOKING
router.post("/create", auth, async (req, res) => {
  try {
    const {
      from,
      to,
      date,
      time,
      price,
      name,
      phone,
      email,
      note,
      bookingFor,
      paymentType,
    } = req.body;

    if (!from || !to || !date) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const booking = new Booking({
      from,
      to,
      date,
      time,
      price,
      name,
      phone,
      email,
      note,
      bookingFor: bookingFor || "self",
      userId: req.user.id,
      status: "waiting", // 🔥 IMPORTANT
      paymentType: paymentType || "unpaid",
    });

    await booking.save();

    // ==========================
    // 🚖 DRIVER MESSAGE (SIMULATION)
    // ==========================
    const driverMessage = `
🚖 NEW RIDE REQUEST

From: ${booking.from}
To: ${booking.to}
Date: ${booking.date}
Time: ${booking.time}

Passenger:
Name: ${booking.name}
Phone: ${booking.phone}

👉 ACCEPT:
PUT /api/booking/driver/${booking._id}
Body: { "status": "confirmed" }

👉 REJECT:
PUT /api/booking/driver/${booking._id}
Body: { "status": "cancelled" }
`;

    console.log(driverMessage);

    // ==========================
    // 👤 CUSTOMER WAIT MESSAGE
    // ==========================
    const customerWaitMessage = `
Your booking is being processed.

Please wait up to 5 minutes while we connect you with a driver.

Route: ${booking.from} → ${booking.to}
`;

    console.log("📩 Customer Message:", customerWaitMessage);

    res.status(201).json({
      message: "Booking created",
      booking,
    });

  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ message: "Create failed" });
  }
});


// ✅ GET MY BOOKINGS
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});


// ✅ CANCEL BOOKING (USER)
router.put("/cancel/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: "cancelled" },
      { returnDocument: "after" }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking cancelled",
      booking,
    });

  } catch (err) {
    res.status(500).json({ message: "Cancel failed" });
  }
});


// ✅ UPDATE PAYMENT (STILL WAITING)
router.put("/pay/:id", auth, async (req, res) => {
  try {
    const { paymentType } = req.body;

    if (!paymentType) {
      return res.status(400).json({ message: "Payment type required" });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        paymentType,
        status: "waiting", // 🔥 STILL WAITING
      },
      { returnDocument: "after" }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Payment updated",
      booking,
    });

  } catch (err) {
    res.status(500).json({ message: "Payment failed" });
  }
});


// ==========================
// 🚖 DRIVER ROUTE
// ==========================

// ✅ DRIVER ACCEPT / REJECT
router.put("/driver/:id", async (req, res) => {
  try {
    const { status } = req.body; // confirmed / cancelled

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ==========================
    // 📩 CUSTOMER FINAL MESSAGE
    // ==========================
    let customerMessage = "";

    if (status === "confirmed") {
      customerMessage = `
✅ Your ride is CONFIRMED

Driver is on the way 🚖

Route: ${booking.from} → ${booking.to}
`;
    }

    if (status === "cancelled") {
      customerMessage = `
❌ Your booking was cancelled

No driver accepted your ride.

Please try again.
`;
    }

    console.log("📩 Customer Update:", customerMessage);

    res.json({
      message: "Status updated",
      booking,
    });

  } catch (err) {
    res.status(500).json({ message: "Driver update failed" });
  }
});


// ==========================
// 👨‍💼 ADMIN ROUTES
// ==========================

// ✅ GET ALL BOOKINGS
router.get("/admin/all", verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});


// ✅ DELETE BOOKING
router.delete("/admin/:id", verifyAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});


// ✅ UPDATE STATUS (ADMIN)
router.put("/admin/:id", verifyAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: "after" }
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;