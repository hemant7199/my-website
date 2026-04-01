"use client";

import { useState } from "react";

export default function Forgot() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ SEND OTP
  const sendOtp = async () => {
    setError("");
    setSuccess("");

    if (!email) return setError("Email required");

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send OTP");
        return;
      }

      setSuccess("OTP sent to your email");
      setStep(2);

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESET PASSWORD
  const resetPassword = async () => {
    setError("");
    setSuccess("");

    if (!otp || !password) {
      return setError("All fields required");
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reset failed");
        return;
      }

      setSuccess("Password updated successfully");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">

        <h1 className="text-3xl font-bold mb-2">BarcaLux</h1>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Forgot Password</h2>
            <p className="text-gray-500 mb-4">
              Enter your email to receive OTP
            </p>

            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Reset Password</h2>
            <p className="text-gray-500 mb-4">{email}</p>

            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              className="w-full border p-3 rounded mb-3"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
  <div className="text-sm space-y-1 mb-3">
    <p className={password.length >= 8 ? "text-green-600" : "text-gray-500"}>
      ✔ At least 8 characters
    </p>
    <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-gray-500"}>
      ✔ One uppercase letter
    </p>
    <p className={/[a-z]/.test(password) ? "text-green-600" : "text-gray-500"}>
      ✔ One lowercase letter
    </p>
    <p className={/[0-9]/.test(password) ? "text-green-600" : "text-gray-500"}>
      ✔ One number
    </p>
    <p className={/[!@#$%^&*]/.test(password) ? "text-green-600" : "text-gray-500"}>
      ✔ One special character
    </p>
  </div>
)}

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}

      </div>
    </div>
  );
}