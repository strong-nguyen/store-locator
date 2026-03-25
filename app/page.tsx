"use client"; // To use Leaflet in Next.js 13
import CafeSearch from '@/components/CafeSearch/CafeSearch';
import dynamic from 'next/dynamic';
import React from 'react';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

// Import Map component with ssr: false
const MapWithNoSSR = dynamic(() => import('@/components/Map/MyMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-500 font-medium">Loading Leaflet map...</p>
    </div>
  )
});

// Define Cafe interface for common use
export interface Cafe {
  id: number;
  name: string;
  lat: number;
  lng: number;
  distance: number;
}

export default function Home() {
  const [cafes, setCafes] = React.useState<Cafe[]>([]);
  const [center, setCenter] = React.useState<[number, number]>([10.7765, 106.6947]);  // Default center is HCM City

  // RecenterMap(center);

  return (
    <div className='flex'>
      <div className='w-[30%] ml-8 mt-10'>
        {/* Cafe search component */}
        <CafeSearch onSearchFinished={(cafesList: Cafe[], searchCenter: [number, number]) => {
          setCafes(cafesList);
          setCenter([searchCenter[1], searchCenter[0]]);  // Change to [lat, long] val
        }} />
      </div>

      <div className="flex w-[70%] min-h-screen flex-col items-center p-8">
        <h1 className="text-2xl font-bold mb-6 text-rose-800">
          Find Cafe Near You
        </h1>

        {/* Container for Leaflet map, need define the height for it */}
        <div className="h-[650px] w-full max-w-5xl shadow-xl overflow-hidden rounded-xl">
          <MapWithNoSSR cafes={cafes} center={center} />
        </div>
      </div>
    </div>

  );
}