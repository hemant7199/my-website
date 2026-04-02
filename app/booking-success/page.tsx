"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Success() {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingFull");

    if (data) {
      const parsed = JSON.parse(data);
      setBooking(parsed);

      // ✅ AUTO SEND EMAIL TO DRIVER
      fetch(`${API_URL}/api/notify/send-driver-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ booking: parsed }),
      });

      // ✅ AUTO WHATSAPP OPEN
      const driverPhone = "34632069135";

      const msg = encodeURIComponent(
        `🚖 New Ride Request

From: ${parsed.from}
To: ${parsed.to}
Date: ${parsed.date}
Time: ${parsed.time}

Passenger:
Name: ${parsed.name}
Phone: ${parsed.phone}`
      );

      setTimeout(() => {
        window.open(`https://wa.me/${driverPhone}?text=${msg}`, "_blank");
      }, 2000);

      // 🔥🔥🔥 FIX: AUTO STATUS REFRESH
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`${API_URL}/api/booking/my`,         
              {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const bookings = await res.json();

          const updated = bookings.find(
            (b: any) => b._id === parsed._id
          );

          if (updated) {
            setBooking(updated);
            localStorage.setItem("bookingFull", JSON.stringify(updated));
          }
        } catch (err) {
          console.log(err);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No booking found</p>
      </div>
    );
  }

  // ✅ WhatsApp manual button
  const driverPhone = "34632069135";
  const message = encodeURIComponent(
    `Hello, I am your passenger for the ride from ${booking.from} to ${booking.to}.`
  );
  const whatsappLink = `https://wa.me/${driverPhone}?text=${message}`;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-black text-white p-6 text-center">
          <h1 className="text-3xl font-bold">Booking Request Sent 🚖</h1>
          <p className="text-gray-300 mt-2">
            Waiting for driver confirmation
          </p>
        </div>

        <div className="p-6 space-y-6">

          {/* STATUS */}
          <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-xl">
            <h2 className="font-semibold text-lg mb-2">Booking Status</h2>

            {(booking.status === "waiting" || !booking.status) && (
              <p className="text-yellow-700 font-medium">
                ⏳ Waiting for driver (up to 5 minutes)
              </p>
            )}

            {booking.status === "confirmed" && (
              <p className="text-green-600 font-medium">
                🚗 Your driver is on the way to pick you up
              </p>
            )}

            {booking.status === "cancelled" && (
              <p className="text-red-600 font-medium">
                ❌ No driver accepted your ride. Please try again.
              </p>
            )}
          </div>

          {/* RIDE DETAILS */}
          <div className="bg-gray-50 p-5 rounded-xl border">
            <h2 className="font-semibold text-lg mb-3">Ride Details</h2>

            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{booking.from}</span>
              <span className="text-gray-400">→</span>
              <span className="font-medium">{booking.to}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-3">
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>
                Status:{" "}
                <span className="font-medium capitalize">
                  {booking.status || "waiting"}
                </span>
              </p>
            </div>
          </div>

          {/* PASSENGER */}
          <div className="bg-gray-50 p-5 rounded-xl border">
            <h2 className="font-semibold text-lg mb-3">Passenger</h2>

            <div className="text-sm text-gray-700 space-y-1">
              <p><b>Name:</b> {booking.name}</p>
              <p><b>Phone:</b> {booking.phone}</p>
              {booking.email && <p><b>Email:</b> {booking.email}</p>}
            </div>
          </div>

          {/* DRIVER */}
          <div className="bg-gray-50 p-5 rounded-xl border">
            <h2 className="font-semibold text-lg mb-3">Driver Details</h2>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-300 rounded-full" />

              <div className="text-sm text-gray-700">
                <p>+34 632069135</p>
              </div>
            </div>

            {/* STATUS MESSAGE */}
            <div className="mt-4 text-sm">

              {(booking.status === "waiting" || !booking.status) && (
                <p className="text-yellow-600 font-medium">
                  ⏳ Waiting for driver confirmation
                </p>
              )}

              {booking.status === "confirmed" && (
                <p className="text-green-600 font-medium">
                  🚗 Driver is on the way
                </p>
              )}

              {booking.status === "cancelled" && (
                <p className="text-red-600 font-medium">
                  ❌ Ride cancelled
                </p>
              )}

            </div>

            {/* WHATSAPP BUTTON */}
            <a
              href={`https://wa.me/34632069135?text=${encodeURIComponent(
                `Hello driver, I am your passenger for ${booking.from} → ${booking.to}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-medium"
            >
              Contact Driver
            </a>
          </div>

          {/* PAYMENT */}
          <div className="bg-gray-50 p-5 rounded-xl border">
            <h2 className="font-semibold text-lg mb-3">Payment</h2>

            <div className="flex justify-between text-sm">
              <p>Mode</p>
              <p className="font-medium capitalize">
                {booking.paymentType}
              </p>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Pay directly to the driver at pickup.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="flex-1 bg-black text-white py-3 rounded-lg font-medium"
            >
              Go Home
            </button>

            <button
              onClick={() => window.print()}
              className="flex-1 border py-3 rounded-lg font-medium"
            >
              Download / Print
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}