const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: String, required: true },

    time: String,
    price: Number,

    name: String,
    phone: String,
    email: String, // ✅ added (you used in frontend)

    note: String,

    bookingFor: {
      type: String,
      default: "self",
    },

    userId: {
      type: String,
      required: true,
    },

    // ✅ UPDATED STATUS FLOW
    status: {
      type: String,
      enum: ["waiting", "confirmed", "completed", "cancelled"],
      default: "waiting",
    },

    paymentType: {
  type: String,
  enum: ["unpaid", "cash", "upi", "card"],
  default: "unpaid",
},
  },
  { timestamps: true }
);

// ✅ prevent OverwriteModelError
module.exports =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);