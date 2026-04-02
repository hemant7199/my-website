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

    // ✅ SAFE localStorage access
    let token = null;
    let bookingId = null;

    try {
      token = localStorage.getItem("token");
      bookingId = localStorage.getItem("bookingId");
    } catch (err) {
      console.log("localStorage error");
    }

    if (!bookingId) {
      setError(t("bookingNotFound"));
      return;
    }

    if (!token) {
      setError(t("notLoggedIn"));
      return;
    }

    try {
      setLoading(true);

      // ✅ FIX: API fallback (CRITICAL)
      

      const res = await fetch(`${API_URL}/api/booking/pay/${bookingId}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paymentType }),
        }
      );

      let data;

try {
  data = await res.json();
} catch {
  setError("Invalid server response");
  return;
}
      console.log("Payment Response:", data);

      if (!res.ok) {
        setError(data.message || t("paymentFailed"));
        return;
      }

      // ✅ SAFE SAVE
      const booking = {
        ...data.booking,
        status: "waiting",
      };

      try {
        localStorage.setItem("bookingFull", JSON.stringify(booking));
      } catch {}

      // ✅ REDIRECT
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