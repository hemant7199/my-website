const nodemailer = require("nodemailer");

// 🔥 CREATE TRANSPORT ONCE (BEST PRACTICE)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= OTP EMAIL =================
const sendOtpEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"BLACKLINE Chauffeur" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code 🔐",
      html: `
        <h2>🔐 OTP Verification</h2>
        <p>Your OTP code is:</p>
        <h1>${otp}</h1>
        <p>This code will expire soon.</p>
      `,
    });

    console.log("✅ OTP email sent to:", to);

  } catch (err) {
    console.log("❌ OTP email error:", err);
    throw err;
  }
};

// ================= BOOKING EMAIL =================
const sendBookingEmail = async (to, booking) => {
  try {
    await transporter.sendMail({
      from: `"BLACKLINE Chauffeur" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Booking Confirmed 🚗",
      html: `
        <h2>🚗 Your Ride is Confirmed</h2>
        <p><b>Route:</b> ${booking.from} → ${booking.to}</p>
        <p><b>Date:</b> ${booking.date}</p>
        <p><b>Time:</b> ${booking.time}</p>
        <p><b>Price:</b> €${booking.price}</p>
        <br/>
        <p>Thank you for choosing BLACKLINE Chauffeur!</p>
      `,
    });

    console.log("✅ Booking email sent");

  } catch (err) {
    console.log("❌ Booking email error:", err);
    throw err;
  }
};

// ✅ EXPORT CORRECTLY
module.exports = {
  sendOtpEmail,
  sendBookingEmail,
};