import React from 'react'
import { MapPin } from 'lucide-react'

const LocationSearchPanel = (props) => {
  console.log(props);

  // Sample array of locations
  const locations = [
    'Mari Aai Chowk, Datta Nagar, Ghansoli',
    'Sector 6, Sanpada, Navi Mumbai',
    'Sector 17, Vashi, Navi Mumbai',
    'Sector 19, Nerul, Navi Mumbai',
    'Sector 30A, Vashi, Navi Mumbai',
    'Sector 21, Nerul, Navi Mumbai'
  ];

  return (
    <div>
      {
        locations.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
          >
            <h2 className='bg-gray-200 h-8 flex items-center justify-center w-12 rounded-full'>
              <MapPin className="w-4 h-4" />
            </h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
        ))
      }
    </div>
  )
}

export default LocationSearchPanel
