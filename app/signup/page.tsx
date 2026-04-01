"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const validatePassword = (pass: string) => {
    return (
      pass.length >= 8 &&
      /[a-z]/.test(pass) &&
      /[A-Z]/.test(pass) &&
      /[0-9]/.test(pass) &&
      /[@$!%*?&]/.test(pass)
    );
  };

  const sendOtp = async () => {
    setError("");
    if (!email) return setError("Email required");

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setStep(2);
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    if (!otp) return setError("Enter OTP");

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid OTP");
        return;
      }

      setStep(3);
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async () => {
    setError("");

    if (!validatePassword(password)) {
      setError("Password must contain uppercase, lowercase, number and special character");
      return;
    }

    try {
      setLoading(true);

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://192.168.18.44:3000";

      const res = await fetch(`${API_URL}/api/auth/set-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName: name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const stored = localStorage.getItem("bookingData");

if (!stored) {
  // 👉 No booking → go back to home
  router.push("/");
  return;
}

      let bookingData;

      try {
        bookingData = JSON.parse(stored);
      } catch {
        setError("Invalid booking data");
        return;
      }

      const bookingRes = await fetch(`${API_URL}/api/booking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const bookingResult = await bookingRes.json();

      if (!bookingRes.ok) {
        setError("Booking creation failed");
        return;
      }

      const bookingId =
        bookingResult?.booking?._id ||
        bookingResult?._id ||
        bookingResult?.id;

      if (!bookingId) {
        setError("Booking ID missing");
        return;
      }

      localStorage.setItem("bookingId", bookingId);

      router.push("/payment");
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2">BLACKLINE</h1>

        {step === 1 && (
          <>
            <h2 className="text-xl mb-4">Create your account</h2>


            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded"
            >
              {loading ? "Sending..." : "Continue"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl mb-2">Verify your email</h2>
            <p className="text-sm text-gray-500 mb-3">{email}</p>

            <input
              className="w-full border p-3 rounded mb-3 text-center"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl mb-3">Set your password</h2>

            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="relative mb-2">
              <input
                type={show ? "text" : "password"}
                className="w-full border p-3 rounded"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-sm"
              >
                👁
              </button>
            </div>

            <div className="text-sm mb-4">
              <p className={password.length >= 8 ? "text-green-600" : "text-red-500"}>
                ✔ 8+ characters
              </p>
              <p className={/[a-z]/.test(password) ? "text-green-600" : "text-red-500"}>
                ✔ lowercase
              </p>
              <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-500"}>
                ✔ uppercase
              </p>
              <p className={/[0-9]/.test(password) ? "text-green-600" : "text-red-500"}>
                ✔ number
              </p>
              <p className={/[@$!%*?&]/.test(password) ? "text-green-600" : "text-red-500"}>
                ✔ special character
              </p>
            </div>

            <button
              onClick={createAccount}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}