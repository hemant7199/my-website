"use client";

import { useState, useEffect } from "react";

export default function Profile() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [email, setEmail] = useState("");

  // ✅ FIX: safe localStorage access
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      setEmail(user.email || "");
    }
  }, []);

  const save = async () => {
    await fetch("http://localhost:5000/api/auth/add-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, email }),
    });

    window.location.href = "/";
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      <h1 className="text-xl mb-4">Add your personal details</h1>

      <input
        placeholder="First Name"
        className="w-full border p-2 mb-2"
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />

      <input
        placeholder="Last Name"
        className="w-full border p-2 mb-2"
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />

      <input
        placeholder="Phone"
        className="w-full border p-2 mb-2"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <button
        onClick={save}
        className="bg-black text-white p-2 mt-3 w-full rounded"
      >
        Save and continue
      </button>

    </div>
  );
}