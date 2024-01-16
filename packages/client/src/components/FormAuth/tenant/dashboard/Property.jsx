import React, { useEffect, useState } from 'react';
import api from '../../../../config/api';
import Image from 'next/image';

const PropertyComponent = () => {
  const [properties, setProperties] = useState([]);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [isEditingProperty, setIsEditingProperty] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    address: '',
    bedrooms: 0,
    bathrooms: 0,
    categories: '',
    rooms: [],
    regularPrice: 0,
    specialPrice: 0,
    offer: '',
    furnished: '',
    parking: '',
    type: '',
    available: '',
    propertyPictures: [],
    isForRent: false,
    isForSale: false,
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/tenants/property');
      const propertiesData = await response.data.data.properties;
      setProperties(propertiesData);
    } catch (error) {
      console.error('Error fetching properties :', error);
    }
  };

  const updateProperty = async (propertyId) => {
    try {
      const response = await api.put(`/property/${propertyId}`, editFormData);
      const propertyData = response.data.data.property;

      setEditingPropertyId(propertyId);
      setEditFormData((prevData) => ({
        ...prevData,
        name: propertyData.name,
        description: propertyData.description,
        address: propertyData.address,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        categories: propertyData.categories,
        available: propertyData.available,
        rooms: propertyData.rooms || [],
        regularPrice: propertyData.regularPrice,
        specialPrice: propertyData.specialPrice,
        offer: propertyData.offer,
        furnished: propertyData.furnished,
        parking: propertyData.parking,
        type: propertyData.type,
        available: propertyData.available,
        propertyPictures: propertyData.property_pictures || [],
        isForRent: propertyData.type === 'Property For Rent',
        isForSale: propertyData.type === 'Property For Sale',
      }));
      setIsEditingProperty(true);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleUpdate = async (propertyId) => {
    try {
      const updatedFormData = {
        ...editFormData,
        rooms: editFormData.rooms.map((room) => ({
          ...room,
          regularPrice: isNaN(room.regularPrice)
            ? 0
            : parseFloat(room.regularPrice),
          specialPrice: isNaN(room.regularPrice)
            ? 0
            : parseFloat(room.regularPrice) * 1.2,
        })),
      };

      const response = await api.put(
        `/property/${propertyId}`,
        updatedFormData,
      );

      if (response.data.status === 'success') {
        await fetchProperties();

        setEditingPropertyId(null);
        setIsEditingProperty(false);
      } else {
        console.error('Failed to update property:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      const response = await api.delete(`/property/delete/${propertyId}`);
      if (response.data.status === 'success') {
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property.id !== propertyId),
        );
      } else {
        console.error('Failed to delete property', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting room', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('rooms')) {
      const [_, roomId, field] = name.split('.');
      setEditFormData((prevData) => ({
        ...prevData,
        rooms: prevData.rooms.map((room) =>
          room.id === Number(roomId) ? { ...room, [field]: value } : room,
        ),
      }));
    } else {
      setEditFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Property List</h2>
      <div>
        {properties.map((property) => (
          <div
            key={property.id}
            className="mb-4 p-4 border border-gray-300 rounded-md"
          >
            <h3 className="text-lg font-semibold mb-2">
              {editingPropertyId === property.id ? (
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                />
              ) : (
                property.name
              )}
            </h3>
            <div className="mt-4">
              {property.propertyPictures &&
              property.propertyPictures.length > 0 ? (
                <div>
                  {property.propertyPictures.map((picture, index) => (
                    <div key={index} className="mb-2 flex items-center gap-5">
                      {picture.property_pictures
                        .split(',')
                        .map((url, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <Image
                              src={url.trim()}
                              alt={`Property ${property.name} - Picture ${
                                index + 1
                              }`}
                              className="mb-2 w-80 h-32 "
                              width={300}
                              height={300}
                            />
                            {isEditingProperty && (
                              <button
                                onClick={() =>
                                  handleDeletePicture(index, imgIndex)
                                }
                                className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-lg hover:opacity-95"
                              >
                                X
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No pictures available for this property.</p>
              )}
            </div>

            <p>
              Description:{' '}
              {editingPropertyId === property.id ? (
                <input
                  type="text"
                  name="description"
                  value={editFormData.description}
                  onChange={handleInputChange}
                />
              ) : (
                property.description
              )}
            </p>
            <p>
              Address:{' '}
              {editingPropertyId === property.id ? (
                <input
                  type="text"
                  name="address"
                  value={editFormData.address}
                  onChange={handleInputChange}
                />
              ) : (
                property.address
              )}
            </p>
            <p>
              Category:{' '}
              {editingPropertyId === property.id ? (
                <input
                  type="text"
                  name="categories"
                  value={editFormData.categories}
                  onChange={handleInputChange}
                />
              ) : (
                property.categories
              )}
            </p>
            <p>
              Type :{' '}
              {editingPropertyId === property.id ? (
                <input
                  type="text"
                  name="type"
                  value={editFormData.type}
                  onChange={handleInputChange}
                />
              ) : (
                property.type
              )}
            </p>
            {property.rooms.map((room) => (
              <div key={room.id}>
                <p>
                  Bedrooms :{' '}
                  {editingPropertyId === property.id ? (
                    <input
                      type="text"
                      name="bedrooms"
                      value={editFormData.rooms[0]?.bedrooms}
                      onChange={handleInputChange}
                    />
                  ) : property.rooms.length > 0 ? (
                    property.rooms[0].bedrooms
                  ) : (
                    ''
                  )}
                </p>
                <p>
                  Bathrooms:{' '}
                  {editingPropertyId === property.id ? (
                    <input
                      type="text"
                      name="bathrooms"
                      value={editFormData.rooms[0]?.bathrooms}
                      onChange={handleInputChange}
                    />
                  ) : property.rooms.length > 0 ? (
                    property.rooms[0].bathrooms
                  ) : (
                    ''
                  )}
                </p>
                <p>
                  Price:{' '}
                  {editingPropertyId === property.id ? (
                    <input
                      type="text"
                      name="regularPrice"
                      value={editFormData.rooms[0]?.regularPrice}
                      onChange={handleInputChange}
                    />
                  ) : property.rooms.length > 0 ? (
                    property.rooms[0].regularPrice
                  ) : (
                    ''
                  )}
                </p>
                <p>
                  Special Price:{' '}
                  {editingPropertyId === property.id ? (
                    <input
                      type="text"
                      name="specialPrice"
                      value={editFormData.rooms[0]?.specialPrice}
                      onChange={handleInputChange}
                    />
                  ) : property.rooms.length > 0 ? (
                    property.rooms[0].specialPrice
                  ) : (
                    ''
                  )}
                </p>
                <p>
                  Furnished :{' '}
                  {editingPropertyId === property.id ? (
                    <input
                      type="text"
                      name="furnished"
                      value={editFormData.rooms[0]?.furnished}
                      onChange={handleInputChange}
                    />
                  ) : property.rooms.length > 0 ? (
                    property.rooms[0].furnished
                  ) : (
                    ''
                  )}
                </p>
                <p>
                  Room Type :{' '}
                  {editingPropertyId === property.id ? (
                    <input
                      type="text"
                      name="type_room"
                      value={editFormData.rooms[0]?.type_room}
                      onChange={handleInputChange}
                    />
                  ) : property.rooms.length > 0 ? (
                    property.rooms[0].type_room
                  ) : (
                    ''
                  )}
                </p>
                <p>
                  Listed on :{' '}
                  {editingPropertyId === property.id ? (
                    <input
                      type="text"
                      name="available"
                      value={editFormData.rooms[0]?.available}
                      onChange={handleInputChange}
                    />
                  ) : property.rooms.length > 0 ? (
                    property.rooms[0].available
                  ) : (
                    ''
                  )}
                </p>

                {editingPropertyId !== property.id && (
                  <button
                    onClick={() => updateProperty(property.id)}
                    className="mt-4 bg-color-pallete1 text-white py-1 px-2 rounded-md"
                  >
                    Update Property
                  </button>
                )}

                {editingPropertyId === property.id && (
                  <button
                    onClick={() => handleUpdate(property.id)}
                    className="mt-4 text-white bg-color-pallete1 py-1 px-2 rounded-md"
                  >
                    Save Changes
                  </button>
                )}

                <button
                  onClick={() => deleteProperty(property.id)}
                  className="mt-4 ml-4 bg-color-lightred text-white py-1 px-2 rounded-md"
                >
                  Delete Property
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyComponent;
