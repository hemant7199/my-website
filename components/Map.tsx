"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

// ✅ Fix marker issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// ✅ CENTER (Vilanova)
const center: [number, number] = [41.223, 1.725];

// ✅ DISTANCE FUNCTION
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ✅ CLICK HANDLER
function LocationSelector({ setLocation }: any) {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      const distance = getDistance(center[0], center[1], lat, lng);

      if (distance > 12) {
        alert("❌ Service only available within 12 km of Vilanova");
        return;
      }

      setLocation([lat, lng]);
    },
  });

  return null;
}

type Props = {
  lat: number;
  lon: number;
};

export default function Map({ lat, lon }: Props) {

  const [location, setLocation] = useState<[number, number] | null>([lat, lon]);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🔥 SERVICE AREA (12 KM) */}
      <Circle
        center={center}
        radius={12000}
        pathOptions={{ color: "blue" }}
      />

      {/* SELECTED LOCATION */}
      {location && (
        <Marker position={location}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}

      {/* CLICK TO SELECT */}
      <LocationSelector setLocation={setLocation} />
    </MapContainer>
  );
}