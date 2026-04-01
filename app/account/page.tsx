"use client";

import { useEffect, useState } from "react";

export default function Account() {
  const [user, setUser]: any = useState(null);

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  const [form, setForm]: any = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setForm(u);
    }
  }, []);

  if (!user) return null;

  const saveProfile = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/update-profile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
          }),
        }
      );

      const data = await res.json();

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      setEditName(false);
      setEditPhone(false);

    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2 text-center">
          My Account
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Manage your personal information
        </p>

        {/* PERSONAL INFO */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 mb-6 relative">

          <button
            onClick={() => setEditName(true)}
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            Edit
          </button>

          <p className="text-gray-400 text-sm">Name</p>

          {!editName ? (
            <p className="font-semibold text-lg">
              {user.firstName} {user.lastName || ""}
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              <input
                className="border-2 border-black p-2 w-full rounded"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />

              <input
                className="border-2 border-black p-2 w-full rounded"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />

              <button
                onClick={saveProfile}
                className="bg-black text-white px-4 py-2 rounded mt-2"
              >
                Save
              </button>
            </div>
          )}

          {/* PHONE */}
          <p className="text-gray-400 text-sm mt-6">Mobile phone</p>

          {!editPhone ? (
            <div className="flex justify-between items-center">
              <p className="font-medium">{user.phone || "-"}</p>

              <button
                onClick={() => setEditPhone(true)}
                className="text-gray-500 hover:text-black"
              >
              Edit
              </button>
            </div>
          ) : (
            <div className="mt-2 space-y-2">
              <input
                className="border-2 border-black p-2 w-full rounded"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <button
                onClick={saveProfile}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          )}

          

        </div>

        {/* EMAIL */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 mb-6 relative">

          <button className="absolute right-4 top-4 text-gray-500 hover:text-black">
          </button>

          <p className="text-gray-400 text-sm">Email address</p>
          <p className="font-medium">{user.email}</p>

        </div>

        {/* PASSWORD */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 mb-6 relative">

          <button
            onClick={() => (window.location.href = "/forgot")}
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            Edit
          </button>

          <p className="text-gray-400 text-sm">Password</p>
          <p className="font-medium">••••••••••</p>

        </div>

        {/* PAYMENT */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">

          <p className="font-semibold mb-3 text-lg">Payment</p>

          <button className="border-2 border-black w-full py-3 rounded-lg hover:bg-black hover:text-white transition">
            + Add new card
          </button>

        </div>

      </div>
    </div>
  );
}