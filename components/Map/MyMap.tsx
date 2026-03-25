"use client"; // Should use this because Leaflet use window object

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

// Define the icon of location marker
const locationMarkerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});



function SearchHandler({ searchResult }: { searchResult: [number, number] }) {
    const map = useMap(); // Access the map instance

    useEffect(() => {
        if (searchResult) {
            // Your callback logic here
            console.log("lat: " + searchResult[0] + ", long: " + searchResult[1]);
            map.flyTo([searchResult[0], searchResult[1]], 13);
        }
    }, [searchResult]);

    return null;
}

export default function MyMap({ cafes, center }: { cafes: any[], center: [number, number] }) {
    // const position: [number, number] = [10.7765, 106.6947]; // HCM coordinates

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
            <Marker position={[center[0], center[1]]} icon={locationMarkerIcon}>
                <Popup>
                    Hello, you are here!
                </Popup>
            </Marker>

            {/* Render nearest cafe from PostgreSQL */}
            {cafes.map((cafe) => (
                <Marker
                    key={cafe.id}
                    position={[cafe.lat, cafe.lng]}
                    icon={locationMarkerIcon}
                >
                    <Popup>
                        <div className="font-bold">{cafe.name}</div>
                        <div>ID: {cafe.id}</div>
                        <div>Distance: {Math.round(cafe.distance)}m</div>
                    </Popup>
                </Marker>
            ))}

            <SearchHandler searchResult={center} />
        </MapContainer>
    );
}