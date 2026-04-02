const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const { verifyAdmin } = require("../middleware/auth");

// GET ALL BOOKINGS
router.get("/bookings", verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

// DELETE BOOKING
router.delete("/bookings/:id", verifyAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// UPDATE STATUS
router.put("/bookings/:id", verifyAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;