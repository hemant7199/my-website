"use client";

import { useEffect, useState } from "react";
import { createBooking } from "../../utils/api";

export default function Success() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("pendingBooking");

    if (stored) {
      const booking = JSON.parse(stored);

      setData(booking);

      // 🔥 SAVE TO DATABASE
      createBooking({
        from: booking.from,
        to: booking.to,
        date: booking.date,
        time: booking.time,
        price: booking.finalPrice,
        status: "confirmed",
      });

      localStorage.removeItem("pendingBooking");
    }
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Booking Confirmed 🎉
      </h1>

      <p className="text-gray-600">
        {data.carName} booked successfully
      </p>

      <p className="mt-2">
        €{data.finalPrice}
      </p>

      <a href="/" className="mt-6 bg-black text-white px-6 py-3 rounded">
        Go Home
      </a>

    </div>
  );
}