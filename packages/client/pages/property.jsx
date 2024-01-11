import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../src/config/api';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/property/upload`);
        const propertiesData = response.data.data.properties;

        const parsedProperties = Array.isArray(propertiesData)
          ? propertiesData
          : JSON.parse(propertiesData);

        setProperties(parsedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const renderProperties = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Sorry, there was an error fetching properties.</p>;
    }

    if (properties.length === 0) {
      return <p>Sorry, there is no property available.</p>;
    }
    return properties.map((property) => (
      <div
        key={property.id}
        className="border w-6/12 max-h-64 rounded-lg p-3 flex justify-between items-center gap-10"
      >
        <Link href={`/listing/${property.id}`} passHref>
          <a>
            <img
              src={
                property.pictures && property.pictures.length > 0
                  ? `${API_URL}/${property.pictures[0].replace(/["']/g, '')}`
                  : ''
              }
              alt="property cover"
              className="h-16 w-16 object-contain"
            />
          </a>
        </Link>
        <Link href={`/listing/${property.id}`} passHref>
          <a className="text-slate-700 font-semibold hover:underline truncate flex-1">
            <h4>{property.name}</h4>
            <p>{property.description}</p>
            <p>{property.address}</p>
          </a>
        </Link>
      </div>
    ));
  };

  return (
    <div>
      <h2>Available Properties</h2>
      {renderProperties()}
    </div>
  );
};

export default PropertyList;
