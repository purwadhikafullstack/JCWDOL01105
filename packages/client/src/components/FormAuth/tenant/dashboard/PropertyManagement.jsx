// PropertyManagementComponent.js
import React, { useState } from 'react';

const PropertyManagementComponent = () => {
  const [properties, setProperties] = useState([
    // Data properties...
  ]);

  const addProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
  };

  const updateProperty = (propertyId, updatedProperty) => {
    const updatedProperties = properties.map((property) =>
      property.id === propertyId ? updatedProperty : property,
    );
    setProperties(updatedProperties);
  };

  const deleteProperty = (propertyId) => {
    const updatedProperties = properties.filter(
      (property) => property.id !== propertyId,
    );
    setProperties(updatedProperties);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Property Management</h2>
      <div className="grid grid-cols-2 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{property.name}</h3>
            <p className="text-sm text-gray-600">{property.description}</p>
            <div className="flex mt-2">
              <button
                onClick={() => deleteProperty(property.id)}
                className="bg-color-red text-white py-1 px-2 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  updateProperty(property.id /* updated property data */)
                }
                className="bg-color-blue text-white py-1 px-2 rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Add Property</h3>
          {/* Form untuk menambah property */}
          {/* ... */}
          <button
            onClick={() => addProperty(/* new property data */)}
            className="bg-color-green text-white py-1 px-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagementComponent;
