"use client";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6 md:py-10 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* CONTENT */}
        <div className="p-5 md:p-10">

          {/* TITLE FIRST */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-3">
              Travel Services
            </h1>

            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Experience seamless and comfortable travel across Europe with professional chauffeur solutions tailored for every journey.
            </p>
          </div>

          {/* IMAGE BELOW TITLE */}
          <div className="mb-8 md:mb-10">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src="/images/drive.png"
                alt="Luxury Travel"
                className="w-full h-56 sm:h-72 md:h-[420px] object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* SERVICES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-10">

            {[
              "Smooth and reliable long-distance travel between major destinations across Europe.",
              "Instantly book a professional driver for convenient and flexible travel.",
              "Timely pickups and drop-offs designed for stress-free airport travel.",
              "Flexible hourly bookings that let you travel at your own pace.",
              "Professional drivers delivering a comfortable and premium experience.",
              "Luxury vehicles for special occasions and high-end travel experiences."
            ].map((text, index) => (
              <div
                key={index}
                className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}

          </div>

          {/* CONTACT */}
          <div className="text-center border-t pt-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Contact Us
            </h2>

            <p className="text-gray-700 text-sm md:text-base">
              📞 +34 632 069 135
            </p>

            <p className="text-gray-700 text-sm md:text-base">
              📧 blackline402@gmail.com
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}