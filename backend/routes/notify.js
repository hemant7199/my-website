const express = require("express");
const router = express.Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ SEND EMAIL TO DRIVER
router.post("/send-driver-email", async (req, res) => {
  try {
    console.log("🔥 EMAIL API CALLED");

    const { booking } = req.body;

    if (!booking) {
      return res.status(400).json({ error: "No booking data" });
    }

    const FRONTEND_URL = process.env.FRONTEND_URL;

    const acceptLink = `${FRONTEND_URL}/driver-response?status=accepted&id=${booking._id}`;
    const rejectLink = `${FRONTEND_URL}/driver-response?status=rejected&id=${booking._id}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "blackline402@gmail.com", // driver email
      subject: "🚖 New Ride Request",
      html: `
        <h2>New Ride Request</h2>
        <p><b>${booking.from} → ${booking.to}</b></p>
        <p>Date: ${booking.date}</p>
        <p>Time: ${booking.time}</p>

        <p><b>Passenger:</b></p>
        <p>${booking.name} (${booking.phone})</p>

        <br/>
        <a href="${acceptLink}">✅ Accept</a><br/>
        <a href="${rejectLink}">❌ Reject</a>
      `,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY");

    res.json({ message: "Email sent to driver" });

  } catch (err) {
    console.log("❌ EMAIL ERROR:", err);
    res.status(500).json({ error: "Email failed" });
  }
});

module.exports = router;