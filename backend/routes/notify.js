const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ✅ SEND EMAIL TO DRIVER
router.post("/send-driver-email", async (req, res) => {
  try {
    console.log("🔥 EMAIL API CALLED");

    const { booking } = req.body;

    if (!booking) {
      console.log("❌ No booking data");
      return res.status(400).json({ error: "No booking data" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

const FRONTEND_URL = process.env.FRONTEND_URL;

const acceptLink = `${FRONTEND_URL}/driver-response?status=accepted&id=${booking._id}`;
const rejectLink = `${FRONTEND_URL}/driver-response?status=rejected&id=${booking._id}`;

   const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "blackline402@gmail.com", // your email ✅ comma added
  subject: "🚖 New Ride Request",
  text: `
New Ride Request

From: ${booking.from}
To: ${booking.to}
Date: ${booking.date}
Time: ${booking.time}

Passenger:
Name: ${booking.name}
Phone: ${booking.phone}
Email: ${booking.email || "Not provided"} 

Accept: ${acceptLink}
Reject: ${rejectLink}
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ EMAIL SENT SUCCESSFULLY");

    res.json({ message: "Email sent to driver" });

  } catch (err) {
    console.log("❌ EMAIL ERROR:", err);
    res.status(500).json({ error: "Email failed" });
  }
});

module.exports = router;