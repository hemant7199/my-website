"use client";

import { useState } from "react";
import { useLanguage } from "../../utils/LanguageContext";

export default function Payment() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { t } = useLanguage();

  const [paymentType, setPaymentType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setError("");

    if (!paymentType) {
      setError(t("selectPayment"));
      return;
    }

    // ✅ FIX: safe localStorage read (TypeScript safe)
    let bookingData;
    const stored = localStorage.getItem("bookingData");

    if (!stored) {
      setError("Booking data missing");
      return;
    }

    try {
      bookingData = JSON.parse(stored);
    } catch {
      setError("Invalid booking data");
      return;
    }

    try {
      setLoading(true);

      // 💳 simulate payment success
      alert("Payment Successful ✅");

      // ✅ create booking AFTER payment
      const res = await fetch(`${API_URL}/api/booking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          paymentType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Booking failed");
        return;
      }

      // ✅ save booking
      localStorage.setItem("bookingFull", JSON.stringify(data.booking));

      // ✅ redirect
      window.location.href = "/booking-success";

    } catch (err) {
      console.log(err);
      setError(t("serverErrorPayment"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white p-4 sm:p-6 rounded-xl shadow">

        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          {t("Select Payment Method")}
        </h1>

        <div className="space-y-3 mb-5">

          {/* CARD */}
          <label className={`flex items-center gap-3 border p-3 rounded cursor-pointer ${
            paymentType === "card" ? "border-black bg-gray-100" : ""
          }`}>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentType === "card"}
              onChange={(e) => setPaymentType(e.target.value)}
            />
            {t("Pay by CARD directly to driver")}
          </label>

          {/* CASH */}
          <label className={`flex items-center gap-3 border p-3 rounded cursor-pointer ${
            paymentType === "cash" ? "border-black bg-gray-100" : ""
          }`}>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentType === "cash"}
              onChange={(e) => setPaymentType(e.target.value)}
            />
            {t("Pay CASH directly to driver")}
          </label>

          {/* UPI */}
          <label className={`flex items-center gap-3 border p-3 rounded cursor-pointer ${
            paymentType === "upi" ? "border-black bg-gray-100" : ""
          }`}>
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentType === "upi"}
              onChange={(e) => setPaymentType(e.target.value)}
            />
            {t("Pay UPI directly to driver")}
          </label>

        </div>

        {error && (
          <p className="text-red-500 mb-3 text-sm">{error}</p>
        )}

        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium"
        >
          {loading ? t("processing") : t("bookRide")}
        </button>

      </div>
    </div>
  );
}