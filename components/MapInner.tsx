"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapInner({ lat, lon }: any) {
  if (!lat || !lon) return null;

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

      <Marker position={[lat, lon]}>
        <Popup>Selected Location</Popup>
      </Marker>
    </MapContainer>
  );
}