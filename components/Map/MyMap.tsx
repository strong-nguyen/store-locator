"use client"; // Bắt buộc vì Leaflet dùng window object

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix lỗi mất icon mặc định của Leaflet trong Next.js
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});


// Hàm hỗ trợ để tự động di chuyển camera khi tọa độ thay đổi
function RecenterMap({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
}


export default function MyMap({cafes, center}: {cafes: any[], center: [number, number]}) {
    const position: [number, number] = [10.7765, 106.6947]; // Tọa độ TP.HCM

    return (
        <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full rounded-lg border-2 border-gray-200"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[center[0], center[1]]} icon={customIcon}>
                <Popup>
                    Vị trí input của bạn. <br /> Chào Trong Nguyen!
                </Popup>
            </Marker>

            {/* Render danh sách quán cafe từ PostgreSQL */}
            {cafes.map((cafe) => (
                <Marker
                    key={cafe.id}
                    position={[cafe.lat, cafe.lng]}
                    icon={customIcon}
                >
                    <Popup>
                        <div className="font-bold">{cafe.name}</div>
                        <div>Cách bạn: {Math.round(cafe.distance)}m</div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}