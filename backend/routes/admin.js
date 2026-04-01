const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const { verifyAdmin } = require("../middleware/auth");

// GET ALL BOOKINGS
router.get("/bookings", verifyAdmin, async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

// DELETE BOOKING
router.delete("/bookings/:id", verifyAdmin, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE STATUS
router.put("/bookings/:id", verifyAdmin, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(booking);
});

module.exports = router;