"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "@/utils/firebase";

export default function Login() {
  const [step, setStep] = useState<"email" | "password">("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  // ================= EMAIL CHECK =================
  const handleEmail = async () => {
    setError("");

    if (!email) return setError("Email required");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error");
        return;
      }

      if (data.exists) {
        setStep("password");
      } else {
        window.location.href = "/signup";
      }

    } catch {
      setError("Backend not running");
    } finally {
      setLoading(false);
    }
  };

  // ================= 🔥 REDIRECT LOGIC =================
  const handleRedirect = async () => {
    try {
      const redirect = new URLSearchParams(window.location.search).get("redirect");

      if (redirect === "save-booking") {
        const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
        const token = localStorage.getItem("token");

        // ✅ TOKEN CHECK
        if (!token) {
          window.location.href = "/";
          return;
        }

        // ✅ BOOKING CHECK
        if (!bookingData?.from) {
          window.location.href = "/";
          return;
        }

        // ✅ SAVE BOOKING
        const res = await fetch("http://localhost:5000/api/booking/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        });

        const data = await res.json();

        if (data?.booking?._id) {
          localStorage.setItem("bookingId", data.booking._id);
        }

        // ✅ GO PAYMENT
        window.location.href = "/payment";

      } else {
        window.location.href = "/";
      }

    } catch (err) {
      console.log("Redirect error:", err);
      window.location.href = "/";
    }
  };

  // ================= LOGIN =================
  const handlePasswordLogin = async () => {
    setError("");

    if (!password) return setError("Password required");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Wrong password");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ REDIRECT AFTER LOGIN
      await handleRedirect();

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE =================
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email: user.email }));

      await handleRedirect();

    } catch {
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= FACEBOOK =================
  const handleFacebookLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email: user.email }));

      await handleRedirect();

    } catch {
      alert("Facebook login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-2">BarcaLux</h1>

        {/* EMAIL STEP */}
        {step === "email" && (
          <>
            <h2 className="text-xl mb-4">Welcome</h2>

            <input
              className="w-full border p-3 rounded mb-3"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <button
              onClick={handleEmail}
              className="w-full bg-black text-white py-3 rounded mt-2"
              disabled={loading}
            >
              {loading ? "Checking..." : "Continue"}
            </button>
          </>
        )}

        {/* PASSWORD STEP */}
        {step === "password" && (
          <>
            <h2 className="text-xl mb-2">Enter Your Password</h2>
            <p className="text-sm text-gray-500 mb-3">{email}</p>

            <div className="relative mb-3">
              <input
                type={show ? "text" : "password"}
                className="w-full border p-3 rounded"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-sm"
              >
                👁
              </button>
            </div>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <Link href="/forgot" className="text-sm underline mb-4 block">
              Forgot password?
            </Link>

            <button
              onClick={handlePasswordLogin}
              className="w-full bg-black text-white py-3 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </>
        )}

        {/* SOCIAL */}
        <div className="mt-6 text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border py-3 rounded-lg mt-3"
        >
          Continue with Google
        </button>

        <button
          onClick={handleFacebookLogin}
          className="w-full border py-3 rounded-lg mt-2"
        >
          Continue with Facebook
        </button>

        {/* SIGNUP */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline font-medium">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}