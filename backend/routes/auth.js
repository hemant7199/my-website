const express = require("express");
const router = express.Router();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ IMPORT CORRECT FUNCTION
const { sendOtpEmail } = require("../utils/sendEmail");


// ================== 1. CHECK EMAIL ==================
router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });

    res.json({ exists: !!user });

  } catch (err) {
    console.log("CHECK EMAIL ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================== 2. SEND OTP ==================
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        otp,
        isVerified: false,
      });
    } else {
      user.otp = otp;
      user.isVerified = false;
    }

    await user.save();

    // ✅ SEND EMAIL
    await sendOtpEmail(email, otp);

    console.log("OTP:", otp); // debug

    res.json({ message: "OTP sent" });

  } catch (err) {
    console.log("SEND OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================== 3. VERIFY OTP ==================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;

    await user.save();

    res.json({ message: "OTP verified" });

  } catch (err) {
    console.log("VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================== 4. SET PASSWORD ==================
router.post("/set-password", async (req, res) => {
  try {
    const { email, password, firstName } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(400).json({ message: "Verify email first" });
    }

    // ✅ PASSWORD RULE
    const strong =
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password);

    if (!strong) {
      return res.status(400).json({
        message: "Password must contain upper, lower, number (min 8 chars)",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.firstName = firstName || "User";

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
      },
    });

  } catch (err) {
    console.log("SET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================== 5. LOGIN ==================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "No account found" });
    }

    // ✅ FIX bcrypt error
    if (!user.password || typeof user.password !== "string") {
      return res.status(400).json({
        message: "Account not set. Please reset password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
      },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================== 6. FORGOT PASSWORD ==================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    await user.save();

    await sendOtpEmail(email, otp);

    console.log("RESET OTP:", otp);

    res.json({ message: "OTP sent" });

  } catch (err) {
    console.log("FORGOT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================== 7. RESET PASSWORD ==================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.otp = null;

    await user.save();

    res.json({ message: "Password updated" });

  } catch (err) {
    console.log("RESET ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================== 8. UPDATE PROFILE ==================
router.put("/update-profile", async (req, res) => {
  try {
    const { email, firstName, lastName, phone } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { firstName, lastName, phone },
      { returnDocument: "after" }
    );

    res.json({ user });

  } catch (err) {
    console.log("PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;