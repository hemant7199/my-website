"use client";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { getCoordinates, getDistance } from "../utils/maps";
import { useLanguage } from "../utils/LanguageContext";
import { useRef } from "react";

export default function Home() {

  const latestQueryRef = useRef("");

  const lang = useLanguage();
  const t = typeof lang?.t === "function" ? lang.t : (text: string) => text;

  const [tab, setTab] = useState<"oneway" | "hourly">("oneway");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fromCoords, setFromCoords] = useState<any>(null);
  const [toCoords, setToCoords] = useState<any>(null);

  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [searching, setSearching] = useState(false);

  const [fromController, setFromController] = useState<AbortController | null>(null);
const [toController, setToController] = useState<AbortController | null>(null);

const searchLocation = async (query: string, type: "from" | "to") => {

  const trimmedQuery = query.trim();

  // minimum 2 chars
  if (trimmedQuery.length < 2) {
    if (type === "from") {
      setFromSuggestions([]);
      setFromCoords(null);
    } else {
      setToSuggestions([]);
      setToCoords(null);
    }
    return;
  }

  // ✅ track latest query
  latestQueryRef.current = trimmedQuery;

  let currentController = type === "from" ? fromController : toController;

  if (currentController) currentController.abort();

  const newController = new AbortController();

  if (type === "from") {
    setFromController(newController);
  } else {
    setToController(newController);
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${trimmedQuery}&countrycodes=es&addressdetails=1&limit=5`,
      { signal: newController.signal }
    );

    const data = await res.json();

    // ❗ ignore old responses
    if (latestQueryRef.current !== trimmedQuery) return;

    if (type === "from") {
      setFromSuggestions(data);
    } else {
      setToSuggestions(data);
    }

  } catch (err: any) {
    if (err.name !== "AbortError") {
      console.log(err);
    }
  }
};

  const calculatePrice = async () => {

    if (!date || !time) {
      alert("Select date & time");
      return;
    }

    if (!from || (tab === "oneway" && !to)) {
      alert("Enter locations");
      return;
    }

    if (from === to) {
      alert("❌ Pickup and Drop cannot be same");
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime < new Date()) {
      alert("❌ Select future date & time");
      return;
    }

    try {
      setSearching(true);

      let fromData = fromCoords;
      let toData = tab === "oneway" ? toCoords : fromCoords;

      if (!fromData) fromData = await getCoordinates(from);
      if (!toData) toData = await getCoordinates(to);

      if (!fromData || !toData) {
        alert("Invalid location");
        return;
      }

      if (!fromData.display_name?.includes("Spain")) {
        alert("❌ Pickup must be in Spain");
        return;
      }

      if (!toData.display_name?.includes("Spain")) {
        alert("❌ Drop must be in Spain");
        return;
      }

      localStorage.setItem("bookingData", JSON.stringify({
        from,
        to,
        date,
        time,
        tab,
        pickupLat: parseFloat(fromData.lat),
        pickupLng: parseFloat(fromData.lon),
        dropLat: parseFloat(toData.lat),
        dropLng: parseFloat(toData.lon),
      }));

      window.location.href = "/cars";

    } catch (err) {
      alert("Error calculating price");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200">

      <Navbar />
      <div className="h-20"></div>

      {/* HERO IMAGE WITH TEXT */}
<div className="relative w-full">

  <Image
    src="/images/cust.png"
    width={1200}
    height={500}
    alt="hero"
    className="w-full h-[260px] sm:h-[320px] md:h-[420px] object-cover"
  />

  <div className="absolute inset-0 bg-black/40"></div>

  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">

    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3">
      Premium Chauffeur Service
    </h1>

    <p className="text-sm md:text-lg mb-3">
      Travel in comfort across Spain
    </p>

    <div className="flex flex-col items-center gap-2 text-sm md:text-base">
      <p>📞 +34 632 069 135</p>
      <p>📧 blackline402@gmail.com</p>

      <a
        href="https://wa.me/34632069135"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center border-2 border-black bg-white text-black py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 transition"
      >
        WhatsApp
      </a>
    </div>

  </div>

</div>

      {/* BOOKING CARD */}
      <div className="mt-8 md:mt-12 px-4">
        <div className="max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">

          {/* FROM */}
          <div className="relative mb-5">
            <input
              className="w-full border-2 border-black p-3 rounded-lg outline-none text-sm sm:text-base"
              placeholder="Pickup location"
              value={from}
              onChange={(e) => {
  const value = e.target.value;

  setFrom(value);
  setFromCoords(null);   // reset old selection
  searchLocation(value, "from");
}}
            />

            {fromSuggestions.length > 0 && (
              <div className="absolute w-full bg-white border shadow max-h-40 overflow-y-auto z-10">
                {fromSuggestions.map((item, i) => (
                  <div
                    key={i}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setFrom(item.display_name);
                      setFromCoords(item);
                      setFromSuggestions([]);
                    }}
                  >
                    📍 {item.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TO */}
          {tab === "oneway" && (
            <div className="relative mb-5">
              <input
                className="w-full border-2 border-black p-3 rounded-lg outline-none text-sm sm:text-base"
                placeholder="Drop location"
                value={to}
                onChange={(e) => {
  const value = e.target.value;

  setTo(value);
  setToCoords(null);   // reset old selection
  searchLocation(value, "to");
}}
              />

              {toSuggestions.length > 0 && (
                <div className="absolute w-full bg-white border shadow max-h-40 overflow-y-auto z-10">
                  {toSuggestions.map((item, i) => (
                    <div
                      key={i}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setTo(item.display_name);
                        setToCoords(item);
                        setToSuggestions([]);
                      }}
                    >
                      📍 {item.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DATE + TIME */}
          <div className="flex flex-col gap-4 mb-6">

            <div>
              <label className="block text-sm font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full border-2 border-black p-3 rounded-lg outline-none text-sm sm:text-base"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Pickup Time
              </label>
              <input
                type="time"
                className="w-full border-2 border-black p-3 rounded-lg outline-none text-sm sm:text-base"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={calculatePrice}
            disabled={searching}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold text-sm sm:text-base"
          >
            {searching ? "Searching..." : "Search Ride"}
          </button>

        </div>
      </div>

      {/* TWO IMAGES */}
      <div className="px-4 sm:px-6 mt-6 md:mt-10 mb-8 md:mb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          <Image
            src="/images/hero.jpg"
            width={500}
            height={300}
            alt="car1"
            className="w-full h-60 object-cover rounded-xl shadow hover:scale-105 transition"
          />

          <Image
            src="/images/first.png"
            width={500}
            height={300}
            alt="car2"
            className="w-full h-60 object-cover rounded-xl shadow hover:scale-105 transition"
          />

        </div>
      </div>

      {/* CONTACT */}
      <div className="mt-12 text-center border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>

        <p className="text-gray-700 mb-1">
          📞 +34 632 069 135
        </p>

        <p className="text-gray-700">
          📧 blackline402@gmail.com
        </p>
      </div>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/34632069135"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <Image
          src="/images/whatsapp.png"
          width={60}
          height={60}
          alt="whatsapp"
          className="w-14 h-14 hover:scale-110 transition"
        />
      </a>

    </div>
  );
}