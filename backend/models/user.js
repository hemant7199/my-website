const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },

  password: {
    type: String,
    default: null,
  },

  firstName: String,
  lastName: String,
  phone: String,

  isVerified: {
    type: Boolean,
    default: false,
  },

  otp: String,
});

// ✅ FIX EXPORT
module.exports =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);