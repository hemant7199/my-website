"use client";

import { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Rides() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const res = await fetch(`${API_URL}/api/booking/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
  console.log("Error fetching bookings");
  return;
}

        setBookings(data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2 text-center">
          My Rides
        </h1>

        <p className="text-gray-500 text-center mb-8">
          View and manage your bookings
        </p>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* EMPTY */}
        {!loading && bookings.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-lg font-medium text-gray-600">
              No rides found
            </h2>
          </div>
        )}

        {/* LIST */}
        <div className="space-y-6">
          {bookings.map((b: any) => (
            <div
              key={b._id}
              className="bg-white p-6 rounded-2xl shadow border border-gray-200"
            >

              {/* ROUTE */}
              <p className="font-semibold text-lg mb-1">
                {b.from} → {b.to}
              </p>

              {/* DATE */}
              <p className="text-gray-500 text-sm mb-2">
                {b.date} • {b.time}
              </p>


              {/* INFO ROW */}
              <div className="flex justify-between text-sm text-gray-600">

                <p>
                  Status:{" "}
                  <span className="font-medium text-black">
                    {b.status}
                  </span>
                </p>

                <p>
                  Payment:{" "}
                  <span className="font-medium text-black">
                    {b.paymentType || "unpaid"}
                  </span>
                </p>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}