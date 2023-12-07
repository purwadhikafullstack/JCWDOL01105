import React, { useState } from 'react';

const RoomComponent = ({ roomData, onUpdateRoom, onDeleteRoom }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRoomData, setEditedRoomData] = useState({ ...roomData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRoomData({ ...editedRoomData, [name]: value });
  };

  const handleUpdateClick = () => {
    onUpdateRoom(editedRoomData);
    setIsEditing(false);
  };

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-md">
      {isEditing ? (
        <div className="flex justify-between items-center mb-2">
          <input
            type="text"
            name="roomNumber"
            value={editedRoomData.roomNumber}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-1 px-2 mr-2"
          />
          <input
            type="checkbox"
            name="availability"
            checked={editedRoomData.availability}
            onChange={(e) =>
              setEditedRoomData({
                ...editedRoomData,
                availability: e.target.checked,
              })
            }
            className="mr-2"
          />
          <input
            type="number"
            name="specialPrice"
            value={editedRoomData.specialPrice}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-1 px-2 mr-2"
          />
          <button
            onClick={handleUpdateClick}
            className="bg-green-500 text-white py-1 px-2 rounded-md"
          >
            Update
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-2">
          <span>{roomData.roomNumber}</span>
          <span>
            Availability:{' '}
            {roomData.availability ? 'Available' : 'Not Available'}
          </span>
          <span>Special Price: {roomData.specialPrice}</span>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={onDeleteRoom}
              className="bg-red-500 text-white py-1 px-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomComponent;
