"use client";

import { useEffect, useState } from "react";

export default function Driver() {
  const [rides, setRides] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/admin/all`)
      .then((res) => res.json())
      .then((data) => setRides(data));
  }, []);

  const acceptRide = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking/driver/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: "confirmed" }),
});

    setRides(
      rides.map((r) =>
        r._id === id ? { ...r, status: "confirmed" } : r
      )
    );
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>

      <div className="space-y-4">
        {rides.map((r) => (
          <div key={r._id} className="border p-4 rounded">

            <p><b>{r.from} → {r.to}</b></p>
            <p>{r.date} | {r.time}</p>

            <p>Status: {r.status}</p>

            {r.status === "pending" && (
              <button
                onClick={() => acceptRide(r._id)}
                className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
              >
                Accept Ride
              </button>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}