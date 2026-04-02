const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// OTP EMAIL
const sendOtpEmail = async (to, otp) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "Your OTP Code 🔐",
      html: `
        <h2>🔐 OTP Verification</h2>
        <h1>${otp}</h1>
      `,
    });

    console.log("✅ OTP sent");
  } catch (err) {
    console.log("❌ Email error:", err);
    throw err;
  }
};

// BOOKING EMAIL
const sendBookingEmail = async (to, booking) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "Booking Confirmed 🚗",
      html: `
        <h2>Ride Confirmed</h2>
        <p>${booking.from} → ${booking.to}</p>
      `,
    });

    console.log("✅ Booking email sent");
  } catch (err) {
    console.log("❌ Email error:", err);
    throw err;
  }
};

module.exports = { sendOtpEmail, sendBookingEmail };