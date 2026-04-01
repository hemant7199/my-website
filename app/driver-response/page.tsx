"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function DriverContent() {
  const params = useSearchParams();

  const status = params.get("status");
  const id = params.get("id");

  // ✅ FIX: API fallback
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://192.168.18.44:3000";

  useEffect(() => {
    const updateStatus = async () => {
      if (!id || !status) return;

      try {
        console.log("Updating booking:", id, status);

        const res = await fetch(`${API_URL}/api/booking/driver/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status === "accepted" ? "confirmed" : "cancelled",
          }),
        });

        const data = await res.json();

        console.log("Response:", data);

        if (!res.ok) {
          console.error("Update failed");
        }

      } catch (err) {
        console.error("API ERROR:", err);
      }
    };

    updateStatus();
  }, [id, status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow text-center">

        {status === "accepted" && (
          <h1 className="text-2xl font-bold text-green-600">
            Ride Accepted ✅
          </h1>
        )}

        {status === "rejected" && (
          <h1 className="text-2xl font-bold text-red-600">
            Ride Rejected ❌
          </h1>
        )}

        {!status && (
          <h1 className="text-lg text-gray-500">
            Invalid request
          </h1>
        )}

      </div>
    </div>
  );
}

export default function DriverResponse() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <DriverContent />
    </Suspense>
  );
}