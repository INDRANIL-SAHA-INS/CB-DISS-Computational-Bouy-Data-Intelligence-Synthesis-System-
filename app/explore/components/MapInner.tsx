import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';

interface FloatData {
  id: string;
  lat: number;
  lon: number;
  status: 'active' | 'inactive';
  lastProfile: string;
  country: string;
  variables: string[];
}

const activeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="#22c55e" stroke="#ffffff" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="#ffffff"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const inactiveIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="#9ca3af" stroke="#ffffff" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="#ffffff"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer().parentElement;
    if (!container) return;
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(container);
    return () => {
      resizeObserver.unobserve(container);
    };
  }, [map]);
  return null;
};

interface MapInnerProps {
  floats: FloatData[];
  onFloatSelect?: (floatId: string) => void;
}

export default function MapInner({ floats, onFloatSelect }: MapInnerProps) {
  return (
    <MapContainer
      id="main-leaflet-map-container"
      center={[-10, 68]}
      zoom={3}
      minZoom={2}
      maxBounds={[[-90, -180], [90, 180]]}
      maxBoundsViscosity={1.0}
      zoomDelta={0.5}
      zoomSnap={0.5}
      className="w-full h-full m-0 p-0 premium-leaflet"
      style={{ background: 'transparent' }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        noWrap={true}
        bounds={[[-90, -180], [90, 180]]}
        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      />
      {floats.map((float) => (
        <Marker
          key={float.id}
          position={[float.lat, float.lon]}
          icon={float.status === 'active' ? activeIcon : inactiveIcon}
          eventHandlers={{
            click: () => onFloatSelect?.(float.id),
          }}
        >
          <Popup className="custom-popup">
            <div className="p-2 bg-gray-800 text-white rounded">
              <h3 className="font-bold text-blue-400">Float {float.id}</h3>
              <p className="text-sm">Status: <span className={float.status === 'active' ? 'text-green-400' : 'text-gray-400'}>{float.status}</span></p>
              <p className="text-sm">Last Profile: {float.lastProfile}</p>
              <p className="text-sm">Country: {float.country}</p>
              <p className="text-sm">Variables: {float.variables.join(', ')}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapResizer />
    </MapContainer>
  );
}
