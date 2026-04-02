"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Fix: disable SSR for phone input
const PhoneInput = dynamic(() => import("react-phone-input-2"), {
  ssr: false,
});

export default function Details() {
  const [bookingFor, setBookingFor] = useState("self");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [pickupSign, setPickupSign] = useState("");
  const [notes, setNotes] = useState("");
  const [reference, setReference] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState<any>(null);

  // ✅ Safe localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("finalBooking");
      if (data) {
        setSummary(JSON.parse(data));
      }
    } catch {
      setSummary(null);
    }
  }, []);

  const handleNext = async () => {
    setError("");

    if (!name || !phone || !email) {
      setError("Name, phone and email are required");
      return;
    }

    if (phone.length < 8) {
      setError("Enter valid phone number");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter valid email");
      return;
    }

    const finalData = {
      ...summary,
      bookingFor,
      name,
      phone,
      email,
      note: pickupSign || notes,
      reference,
    };

    // ✅ Safe token
    let token = null;
    try {
      token = localStorage.getItem("token");
    } catch {}

    if (!token) {
      localStorage.setItem("bookingData", JSON.stringify(finalData));
      window.location.href = "/login?redirect=save-booking";
      return;
    }

    try {
      setLoading(true);

      // ✅ IMPORTANT: change IP if needed
      

      console.log("Using internal API route");
      console.log("Sending Data:", finalData);

      const res = await fetch(`${API_URL}/api/booking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      console.log("Response Status:", res.status);

      // ✅ handle non-json safely
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON response");
      }

      console.log("Response Data:", data);

      if (!res.ok) {
        setError(data.message || "Booking failed");
        return;
      }

      if (data?.booking?._id) {
        localStorage.setItem("bookingId", data.booking._id);
      }

      window.location.href = "/payment";

    } catch (err: any) {
      console.error("ERROR:", err);

      // ✅ better error message
      if (err.message.includes("Failed to fetch")) {
        setError("Server connection failed");
      } else {
        setError("Server error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Passenger Details
        </h1>

        {summary && (
          <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
            <p>
              <b>
                {summary.from} → {summary.to}
              </b>
            </p>
            <p>
              {summary.carName}
            </p>
          </div>
        )}

        {/* BOOKING FOR */}
        <div className="mb-5">
          <h2 className="font-semibold mb-2">
            Select who you are booking for
          </h2>

          <div className="border rounded p-3 space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={bookingFor === "self"}
                onChange={() => setBookingFor("self")}
              />
              Book for myself
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={bookingFor === "other"}
                onChange={() => setBookingFor("other")}
              />
              Book for someone else
            </label>
          </div>
        </div>

        {/* INPUTS */}
        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Full Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* PHONE */}
        <div className="mb-4">
          <PhoneInput
            country={"es"}
            value={phone}
            onChange={(value) => setPhone(value)}
            containerStyle={{ width: "100%" }}
            inputStyle={{
              width: "100%",
              height: "50px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              paddingLeft: "60px",
            }}
          />
        </div>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Pickup sign name"
          value={pickupSign}
          onChange={(e) => setPickupSign(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded mb-3"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Reference code"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          {loading ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
}