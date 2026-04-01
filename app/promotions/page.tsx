export default function Promotions() {
  return (
    <div className="p-10 text-center">

      <h1 className="text-3xl font-bold mb-6">
        Promotions
      </h1>

      <p className="text-gray-500 mb-20">
        There are no promotions available in your account at this time.
      </p>

      {/* BUTTON */}
      <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-10 py-3 rounded-full">
        Book Now
      </button>

    </div>
  );
}