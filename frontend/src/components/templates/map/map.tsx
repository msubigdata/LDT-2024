import { useEffect, useMemo, useRef } from "react";

import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { PageLoader } from "@/components/modules/page-loader";
import { Button } from "@/components/ui/button";
import { type Camera } from "@/types";

import type { LatLngExpression, Map as MapType } from "leaflet";
import type { RefObject } from "react";

interface MapProps {
  cams?: Camera[];
  aim?: LatLngExpression;
  isLoading?: boolean;
}

const defaultZoom = 15;

export function Map({ cams, aim, isLoading }: MapProps) {
  const mapRef = useRef<MapType>(null);

  const firstCamAsMapCenter = useMemo<LatLngExpression>(
    () => (cams ? [Number(cams.at(0)?.latitude), Number(cams.at(0)?.longitude)] : [0, 0]),
    [cams],
  );

  const resizeMap = (map: RefObject<MapType>) => {
    const resizeObserver = new ResizeObserver(() => map.current?.invalidateSize());
    const container = document.getElementById("map-container");
    if (container) {
      resizeObserver.observe(container);
    }
  };

  useEffect(() => {
    if (aim) {
      mapRef.current?.flyTo(aim, defaultZoom, { duration: 2 });
    }
  }, [aim]);

  if (isLoading) {
    return <PageLoader>Загрузка карты...</PageLoader>;
  }

  return (
    <MapContainer
      ref={mapRef}
      center={firstCamAsMapCenter}
      zoom={defaultZoom}
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
            <Button>{cam.title}</Button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
