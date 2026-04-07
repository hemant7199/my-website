export const searchPlaces = async (query: string) => {
  if (!query || query.trim().length < 1) return [];

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=es&limit=5`,
      {
        headers: {
          "User-Agent": "cab-app",
        },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data;

  } catch {
    return [];
  }
};