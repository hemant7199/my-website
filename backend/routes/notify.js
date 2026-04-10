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
      console.log("❌ No booking data");
      return res.status(400).json({ error: "No booking data" });
    }

const FRONTEND_URL = "https://www.blacklines.es";

const acceptLink = `${FRONTEND_URL}/driver-response?status=accepted&id=${booking._id}`;
const rejectLink = `${FRONTEND_URL}/driver-response?status=rejected&id=${booking._id}`;

// ✅ SEND EMAIL USING RESEND
const response = await resend.emails.send({
  from: "BLACKLINE <noreply@blacklines.es>", // ✅ FIXED
  to: "blackline402@gmail.com",
  subject: "🚖 New Ride Request",

      html: `
        <h2>🚖 New Ride Request</h2>

        <p><b>From:</b> ${booking.from}</p>
        <p><b>To:</b> ${booking.to}</p>
        <p><b>Date:</b> ${booking.date}</p>
        <p><b>Time:</b> ${booking.time}</p>

        <h3>Passenger</h3>
        <p><b>Name:</b> ${booking.name}</p>
        <p><b>Phone:</b> ${booking.phone}</p>
        <p><b>Email:</b> ${booking.email || "Not provided"}</p>

        <br/>

        <a href="${acceptLink}" style="padding:10px 15px;background:green;color:white;text-decoration:none;">
          ✅ Accept
        </a>

        <br/><br/>

        <a href="${rejectLink}" style="padding:10px 15px;background:red;color:white;text-decoration:none;">
          ❌ Reject
        </a>
      `,
    });

    console.log("✅ EMAIL SENT:", response);

    res.json({ message: "Email sent to driver" });

  } catch (err) {
    console.log("❌ EMAIL ERROR:", err);
    res.status(500).json({ error: "Email failed" });
  }
});

module.exports = router;