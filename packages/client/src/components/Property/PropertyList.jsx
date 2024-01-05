import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../config/api';

const PropertyList = ({ searchCriteria }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const response = await api.get('/property/properties');
        const propertiesData = response.data.data.properties;

        setProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchCriteria]);

  const renderProperties = () => {
    console.log(properties);
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Sorry, there was an error fetching properties.</p>;
    }

    if (properties.length === 0) {
      return <p>Sorry, there is no property available.</p>;
    }

    return properties.map((property) => {
      let imageUrls = '';

      if (property.propertyPictures && property.propertyPictures.length > 0) {
        const firstImageUrl = property.propertyPictures[0].property_pictures;
        imageUrls = firstImageUrl.split(',').map((url) => url.trim());
      }

      const imageUrl = imageUrls.length > 0 ? imageUrls[0] : null;

      return (
        <div key={property.id} className="card shadow-xl">
          <Link href={`/property/${property.id}`} passHref>
            <a>
              <div className="">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={`property cover`}
                    className="w-full object-contain"
                  />
                ) : (
                  <p>No pictures available</p>
                )}
              </div>
            </a>
          </Link>
          <Link href={`/property/${property.id}`} passHref>
            <a className="text-slate-700 font-semibold truncate flex-1">
              <div className="landing-text">
                <h4 className="card-title">{property.name}</h4>
                <p className="hover:underline">{property.description}</p>
                <p>{property.address}</p>
              </div>
            </a>
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="landing-page grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
        {renderProperties()}
      </div>
    </div>
  );
};

export default PropertyList;
