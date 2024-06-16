import { useMemo, useRef } from "react";

import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { type Camera } from "@/types";

import type { LatLngExpression, Map as MapType } from "leaflet";
import type { RefObject } from "react";

interface MapProps {
  cams?: Camera[];
}

export function Map({ cams }: MapProps) {
  const mapRef = useRef<MapType>(null);

  const resizeMap = (map: RefObject<MapType>) => {
    const resizeObserver = new ResizeObserver(() => map.current?.invalidateSize());
    const container = document.getElementById("map-container");
    if (container) {
      resizeObserver.observe(container);
    }
  };

  const centerByFirstPoint = useMemo<LatLngExpression>(() => [54.762796, 55.864275], []);

  // const maxBounds = useMemo<LatLngBoundsExpression>(() => [], []);

  return (
    <MapContainer
      ref={mapRef}
      center={centerByFirstPoint}
      zoom={15}
      maxZoom={18}
      scrollWheelZoom
      zoomControl={false}
      className="size-full"
      id="map-container"
      whenReady={() => {
        resizeMap(mapRef);
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cams?.map((cam) => (
        <Marker position={[Number(cam.latitude), Number(cam.longitude)]} key={cam.id}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
