"use client";
import { useEffect, useState } from "react";

export default function Cars() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("bookingData");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData(null);
      }
    }
  }, []);

  if (!data) return <p className="p-6 text-center">Loading...</p>;

  const cars = [
    {
      name: "Business Class",
      subtitle: "Mercedes-Benz E-Class or similar",
      passengers: 4,
      bags: 4,
      img: "/images/c.jpeg",
    },
    {
      name: "Business Van/SUV",
      subtitle: "Mercedes-Benz V-Class or similar",
      passengers: 8,
      bags: 8,
      img: "/images/b.jpeg",
    },
    {
      name: "First Class",
      subtitle: "Mercedes-Benz S-Class or similar",
      passengers: 4,
      bags: 4,
      img: "/images/a.jpeg",
    },
    {
      name: "Toyota Corolla",
      subtitle: "Toyota Corolla or similar",
      passengers: 4,
      bags: 4,
      img: "/images/d.jpeg",
    },
  ];

  const handleSelect = (car: any) => {
    const fullData = {
      ...data,
      carName: car.name,
      carType: car.subtitle,
    };
    localStorage.setItem("finalBooking", JSON.stringify(fullData));
    window.location.href = "/details";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-10 px-4">
      
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-2">
        Choose your ride
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Select a vehicle that suits your journey
      </p>

      {/* ROUTE ONLY (DISTANCE REMOVED) */}
      <div className="bg-white max-w-xl mx-auto rounded-xl shadow p-4 text-center mb-10 border">
        <p className="text-sm text-gray-500">
          Your trip
        </p>
        <p className="font-semibold text-lg">
          {data.from} → {data.to}
        </p>
      </div>

      {/* CAR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {cars.map((car, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden border"
          >
            <img
              src={car.img}
              alt={car.name}
              className="w-full h-44 object-cover"
            />

            <div className="p-5">
              <h2 className="text-lg font-semibold mb-1">
                {car.name}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {car.subtitle}
              </p>

              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>👤 {car.passengers}</span>
                <span>🧳 {car.bags}</span>
              </div>

              {/* PRICE REMOVED */}
              <div className="flex justify-end items-center">
                <button
                  onClick={() => handleSelect(car)}
                  className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-900"
                >
                  Select
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}