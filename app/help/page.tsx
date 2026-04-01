"use client";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* TITLE */}
        <div className="text-center py-6 px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Help & Support
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            We're here 24/7 to assist you across Europe
          </p>
        </div>

        {/* IMAGE (FULL CLEAR - NO OVERLAY) */}
        <div className="px-4 md:px-6 pb-6">
          <div className="overflow-hidden rounded-xl shadow">
            <img
              src="/images/23.png"
              alt="Luxury Ride"
              className="w-full h-56 sm:h-72 md:h-96 object-cover transition duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10">

          {/* CONTACT */}
          <div className="bg-gray-50 rounded-xl p-5 shadow-sm mb-8 text-center">
            <h2 className="text-lg md:text-xl font-semibold mb-3">
              Contact Us
            </h2>
            <p className="text-gray-700">📞 +34 632 069 135</p>
            <p className="text-gray-700">📧 blackline402@gmail.com</p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-6 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <p className="font-medium">How do I book a ride?</p>
                <p className="text-sm text-gray-500 mt-1">
                  Enter pickup & drop locations, choose vehicle, and confirm.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <p className="font-medium">Can I cancel my booking?</p>
                <p className="text-sm text-gray-500 mt-1">
                  Yes, free cancellation before pickup time.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <p className="font-medium">Do you operate across Europe?</p>
                <p className="text-sm text-gray-500 mt-1">
                  Yes, BLACKLINE operates in major European cities.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <p className="font-medium">How do I contact my driver?</p>
                <p className="text-sm text-gray-500 mt-1">
                  Driver details are shared after booking.
                </p>
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="text-sm text-gray-500 border-t pt-6 mt-10 text-center">
            Our support team is available 24/7 for a smooth experience.
          </div>

        </div>

      </div>
    </div>
  );
}