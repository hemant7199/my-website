"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔒 If not logged in → redirect
    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${API_URL}/api/booking/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="border p-4 mb-3 rounded">
            <p><b>From:</b> {b.from}</p>
            <p><b>To:</b> {b.to}</p>
            <p><b>Date:</b> {b.date}</p>
            <p><b>Time:</b> {b.time}</p>
            <p className="text-green-600 font-bold">€{b.price}</p>
          </div>
        ))
      )}
    </div>
  );
}