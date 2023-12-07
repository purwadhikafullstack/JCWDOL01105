import React, { useState } from 'react';
import RoomComponent from './Room'; // Komponen RoomComponent yang akan menampilkan detail kamar

const PropertyComponent = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      propertyName: 'Property A',
      location: 'City X',
      rooms: [
        {
          id: 101,
          roomNumber: '101',
          availability: true,
          specialPrice: 0,
        },
        {
          id: 102,
          roomNumber: '102',
          availability: false,
          specialPrice: 120,
        },
      ],
    },
    {
      id: 2,
      propertyName: 'Property B',
      location: 'City Y',
      rooms: [
        {
          id: 201,
          roomNumber: '201',
          availability: true,
          specialPrice: 0,
        },
        // Tambahkan kamar lain jika perlu
      ],
    },
    // Tambahkan properti lain jika perlu
  ]);

  const addRoom = (propertyId, roomData) => {
    const updatedProperties = properties.map((property) =>
      property.id === propertyId
        ? { ...property, rooms: [...property.rooms, roomData] }
        : property,
    );
    setProperties(updatedProperties);
  };

  const updateRoom = (propertyId, roomId, updatedRoomData) => {
    const updatedProperties = properties.map((property) =>
      property.id === propertyId
        ? {
            ...property,
            rooms: property.rooms.map((room) =>
              room.id === roomId ? { ...room, ...updatedRoomData } : room,
            ),
          }
        : property,
    );
    setProperties(updatedProperties);
  };

  const deleteRoom = (propertyId, roomId) => {
    const updatedProperties = properties.map((property) =>
      property.id === propertyId
        ? {
            ...property,
            rooms: property.rooms.filter((room) => room.id !== roomId),
          }
        : property,
    );
    setProperties(updatedProperties);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Property & Room List</h2>
      <div>
        {properties.map((property) => (
          <div
            key={property.id}
            className="mb-4 p-4 border border-gray-300 rounded-md"
          >
            <h3 className="text-lg font-semibold mb-2">
              {property.propertyName}
            </h3>
            <p>Location: {property.location}</p>
            <div className="mt-2">
              <h4 className="text-md font-semibold mb-2">Room List</h4>
              {property.rooms.map((room) => (
                <RoomComponent
                  key={room.id}
                  roomData={room}
                  onUpdateRoom={(updatedRoomData) =>
                    updateRoom(property.id, room.id, updatedRoomData)
                  }
                  onDeleteRoom={() => deleteRoom(property.id, room.id)}
                />
              ))}
            </div>
            <button
              onClick={() =>
                addRoom(property.id, {
                  id: Math.floor(Math.random() * 1000),
                  roomNumber: '',
                  availability: true,
                  specialPrice: 0,
                })
              }
              className="mt-4 bg-blue-500 text-white py-1 px-2 rounded-md"
            >
              Add Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyComponent;
