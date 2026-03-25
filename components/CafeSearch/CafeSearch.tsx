import { Cafe } from '@/app/page';
import React from 'react'

interface Props {
    onSearchFinished: (data: Cafe[], center: [number, number]) => void;
}

const CafeSearch = ({ onSearchFinished }: Props) => {
    const [longtitude, setLongtitude] = React.useState('');
    const [latitude, setLatitude] = React.useState('');

    const [cafes, setCafes] = React.useState<Cafe[]>([]); // State để lưu danh sách cafe sau khi tìm kiếm

    const searchNearestCafe = async () => {
        if (!longtitude || !latitude) {
            alert("Please enter both longitude and latitude!");
            return;
        }

        console.log('Searching for 5 nearest cafe...');

        try {
            const response = await fetch(`/api/cafes?lng=${longtitude}&lat=${latitude}`);
            const data = await response.json();

            console.log("Kết quả từ Postgres:", data);

            // Update nearest cafes on map
            onSearchFinished(data, [parseFloat(longtitude), parseFloat(latitude)]);


            setCafes(data); // Cập nhật state với danh sách cafe mới

        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    }


  return (
    <div>
        <h1>Enter your location:</h1>
        <div>Longtitude:</div>
        <input type="number" min="-180" max="180" step="any" placeholder='Enter your longtitude' className='border-2 border-gray-300 rounded-md p-2 mb-4 w-full max-w-sm' value={longtitude} onChange={(e) => setLongtitude(e.target.value)} />
        <div>Latitude:</div>
        <input type="number" min="-90" max="90" step="any" placeholder='Enter your latitude' className='border-2 border-gray-300 rounded-md p-2 mb-4 w-full max-w-sm' value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer' onClick={searchNearestCafe}>
            Search Nearest Cafe
        </button>

          {/* Danh sách text bên dưới nút */}
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