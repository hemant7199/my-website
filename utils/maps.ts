export const searchPlaces = async (query: string) => {
  if (!query || query.trim().length < 1) return [];

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=es&limit=5`,
      {
        headers: {
          "User-Agent": "cab-app",
        },
      }
    );

    const data = await res.json();

    return data; // 🔥 full list (not data[0])

  } catch {
    return [];
  }
};