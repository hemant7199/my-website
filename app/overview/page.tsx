"use client";

import Navbar from "../../components/Navbar";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />
      <div className="h-20"></div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* TITLE */}
        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            Overview
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-2">
            BLACKLINE Chauffeur Service
          </p>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Premium private rides across Europe with comfort, safety, and luxury.
          </p>

        </div>

        {/* ✅ SINGLE IMAGE */}
        <div className="mb-12">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/images/24.png"
              alt="Luxury Travel"
              className="w-full h-56 sm:h-72 md:h-[420px] object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">

          <div className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">Luxury Vehicles</h2>
            <p className="text-gray-500 text-sm">
              Travel in premium cars like Mercedes V-Class and executive sedans.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">Europe Coverage</h2>
            <p className="text-gray-500 text-sm">
              Available in major cities across Spain and Europe.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">On-Time Service</h2>
            <p className="text-gray-500 text-sm">
              Professional drivers ensuring punctual and safe journeys.
            </p>
          </div>

        </div>

        {/* HOW IT WORKS (YOUR ORIGINAL STYLE) */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8">
            How It Works
          </h2>

          <div className="space-y-6 text-gray-700">

            <div className="bg-white p-5 rounded-xl shadow border">
              <p className="font-semibold">1. Book Ride</p>
              <p className="text-sm text-gray-500">
                Enter your pickup and drop-off location, select date and time.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border">
              <p className="font-semibold">2. Choose Car</p>
              <p className="text-sm text-gray-500">
                Select from available vehicles like sedan or van with pricing.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border">
              <p className="font-semibold">3. Enter Details</p>
              <p className="text-sm text-gray-500">
                Provide your name, phone number, and email.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border">
              <p className="font-semibold">4. Login / Continue</p>
              <p className="text-sm text-gray-500">
                If you are not logged in, you will be asked to log in. Otherwise, you continue directly.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border">
              <p className="font-semibold">5. Payment Options</p>
              <p className="text-sm text-gray-500">
                Choose to pay online or pay directly to the driver after the ride.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border">
              <p className="font-semibold">6. Booking Confirmation</p>
              <p className="text-sm text-gray-500">
                After booking, you receive full details including trip summary and booking ID.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border">
              <p className="font-semibold">7. Driver Details</p>
              <p className="text-sm text-gray-500">
                Driver name, phone number, and vehicle details are shared before pickup.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border">
              <p className="font-semibold">8. Support & Help</p>
              <p className="text-sm text-gray-500">
                If you face any issue, contact our support team anytime.
              </p>
              <p className="text-sm mt-2">
                📞 +34 632 069 135
                 <br />
                📧 blackline402@gmail.com
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Book Your Ride
          </button>
        </div>

      </div>

    </div>
  );
}