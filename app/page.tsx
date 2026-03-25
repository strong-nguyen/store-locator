"use client"; // Bắt buộc để sử dụng Leaflet trong Next.js 13
import CafeSearch from '@/components/CafeSearch/CafeSearch';
import dynamic from 'next/dynamic';
import React from 'react';

// Import component Map với tùy chọn ssr: false
const MapWithNoSSR = dynamic(() => import('@/components/Map/MyMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-500 font-medium">Đang tải bản đồ...</p>
    </div>
  )
});

// Định nghĩa Interface để dùng chung
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





  return (
    <div>
      <CafeSearch onSearchFinished={(cafesList: Cafe[], searchCenter: [number, number]) => {
        setCafes(cafesList);
        setCenter(searchCenter);
      }} />
      <div className="flex min-h-screen flex-col items-center p-8">
        <h1 className="text-2xl font-bold mb-6 text-rose-800">
          Find Cafe Near You
        </h1>

        {/* Container cho bản đồ - Cần xác định chiều cao cụ thể */}
        <div className="h-[600px] w-full max-w-5xl shadow-xl overflow-hidden rounded-xl">
          <MapWithNoSSR cafes={cafes} center={center} />
        </div>
      </div>
    </div>

  );
}