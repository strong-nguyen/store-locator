import { Cafe } from '@/app/page';
import React from 'react'

interface Props {
    onSearchFinished: (data: Cafe[], center: [number, number]) => void;
}

const CafeSearch = ({ onSearchFinished }: Props) => {
    // Default value is at QuangTrung Software Park
    const [longitude, setLongitude] = React.useState(106.628300);
    const [latitude, setLatitude] = React.useState(10.853844);

    const [cafes, setCafes] = React.useState<Cafe[]>([]); // Store list of nearest cafes after searching

    const searchNearestCafe = async () => {
        if (!longitude || !latitude) {
            alert("Please enter both longitude and latitude!");
            return;
        }

        console.log('Searching for 5 nearest cafe...');

        try {
            const response = await fetch(`/api/cafes?lng=${longitude}&lat=${latitude}`);
            const data = await response.json();

            console.log("Postgres returns:", data);

            // Update nearest cafes on map
            onSearchFinished(data, [longitude, latitude]);

            setCafes(data); // Update list of cafes on UI
        } catch (error) {
            console.error("API /api/cafes met error:", error);
        }
    }

    return (
        <div>
            <h1 className='text-blue-600 font-bold text-2xl mb-3'>Enter your location</h1>
            <div>Longitude</div>
            <input type="number" min="-180" max="180" step="any" placeholder='Enter your longitude' className='border-2 border-gray-300 rounded-md p-2 mb-4 w-full max-w-sm' value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            <div>Latitude</div>
            <input type="number" min="-90" max="90" step="any" placeholder='Enter your latitude' className='border-2 border-gray-300 rounded-md p-2 mb-4 w-full max-w-sm' value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer' onClick={searchNearestCafe}>
                Search Nearest Cafe
            </button>

            {/* List of nearest cafes */}
            <ul className="mt-4">
                {cafes.map(cafe => (
                    <li key={cafe.id} className="text-sm border-b py-2">
                        <strong>{cafe.name}</strong> - {Math.round(cafe.distance)}m
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CafeSearch