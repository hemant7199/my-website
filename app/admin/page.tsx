"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 ADMIN PROTECTION (JWT FIX)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/admin-login";
    }
  }, []);

  // 📦 FETCH BOOKINGS WITH TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/bookings", {
      headers: {
        Authorization: token || "",
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/admin-login";
        }
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const deleteBooking = async (id: string) => {
    const token = localStorage.getItem("token");

    const confirmDelete = confirm("Delete this booking?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token || "",
      },
    });

    setBookings(bookings.filter((b) => b._id !== id));
  };

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify({ status }),
    });

    setBookings(
      bookings.map((b) =>
        b._id === id ? { ...b, status } : b
      )
    );
  };

  if (loading) {
    return <p className="p-6">Loading bookings...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Dashboard
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">

        <table className="w-full text-sm text-left">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Route</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b hover:bg-gray-50">

                <td className="p-3 font-medium">
                  {b.from} → {b.to}
                </td>

                <td className="p-3">{b.date}</td>
                <td className="p-3">{b.time}</td>

                <td className="p-3 font-semibold text-green-600">
                  €{b.price}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={() => updateStatus(b._id, "confirmed")}
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => updateStatus(b._id, "completed")}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => deleteBooking(b._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}