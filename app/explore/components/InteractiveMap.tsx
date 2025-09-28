'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// No need to set Leaflet icon defaults here; handled in MapInner if needed

interface FloatData {
  id: string;
  lat: number;
  lon: number;
  status: 'active' | 'inactive';
  lastProfile: string;
  country: string;
  variables: string[];
}

const mockFloats: FloatData[] = [
  { id: '2902214', lat: -10.5, lon: 65.2, status: 'active', lastProfile: '2024-01-15', country: 'India', variables: ['TEMP', 'PSAL', 'DOXY'] },
  { id: '2902215', lat: -8.3, lon: 67.8, status: 'active', lastProfile: '2024-01-14', country: 'India', variables: ['TEMP', 'PSAL'] },
  { id: '2902216', lat: -12.1, lon: 63.5, status: 'inactive', lastProfile: '2023-12-20', country: 'USA', variables: ['TEMP', 'PSAL', 'DOXY'] },
  { id: '2902217', lat: -15.7, lon: 69.2, status: 'active', lastProfile: '2024-01-16', country: 'France', variables: ['TEMP', 'PSAL', 'CHLA'] },
  { id: '2902218', lat: -6.8, lon: 71.4, status: 'active', lastProfile: '2024-01-15', country: 'India', variables: ['TEMP', 'PSAL', 'DOXY', 'CHLA'] },
];

// Custom icons for different float statuses
// Icons are handled in MapInner

interface InteractiveMapProps {
  onFloatSelect?: (floatId: string) => void;
  selectedFloats?: string[];
}

// MapResizer is handled in MapInner

const MapInner = dynamic(() => import('./MapInner'), { ssr: false });

export default function InteractiveMap({ onFloatSelect, selectedFloats = [] }: InteractiveMapProps) {
  const [filteredFloats, setFilteredFloats] = useState<FloatData[]>(mockFloats);

  return (
    <div className="w-full h-full m-0 p-0 bg-transparent relative">
  <MapInner key="main-leaflet-map" floats={filteredFloats} onFloatSelect={onFloatSelect} />
    </div>
  );
}