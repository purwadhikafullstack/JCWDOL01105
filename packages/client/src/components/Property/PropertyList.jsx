import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../config/api';
import { useRouter } from 'next/router';
import Pagination from '../utils/Pagination';
import Skeleton from '../utils/Skeleton';
import FilterSection from '../Navbar/FilterSection';
import Image from 'next/image';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { query } = router;
  const itemsPerPage = 10;

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        let response;
        let endpoint = '/property/properties';

        if (query.category) {
          endpoint = `/property/search?category=${query.category}`;
        } else if (query.location) {
          endpoint = `/property/search?location=${query.location}`;
        }

        if (query.sort) {
          endpoint += `?sort=${query.sort}`;
        }

        response = await api.get(endpoint);

        const propertiesData =
          query.category || query.location
            ? response.data.data
            : response.data.data.properties;

        if (query.sort === 'priceAsc') {
          propertiesData = propertiesData.sort((a, b) => {
            return a.rooms[0].regularPrice - b.rooms[0].regularPrice;
          });
        } else if (query.sort === 'priceDesc') {
          propertiesData = propertiesData.sort((a, b) => {
            return b.rooms[0].regularPrice - a.rooms[0].regularPrice;
          });
        } else if (query.sort === 'az') {
          propertiesData = propertiesData.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        } else if (query.sort === 'za') {
          propertiesData = propertiesData.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
        }

        setProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchProperties();
  }, [query.category, query.location, query.sort]);

  const renderProperties = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const propertiesToDisplay = properties.slice(startIndex, endIndex);

    if (loading) {
      return Array.from({ length: itemsPerPage }).map((_, index) => (
        <Skeleton key={index} />
      ));
    }

    if (error) {
      return <p>Sorry, there was an error fetching properties.</p>;
    }

    if (!Array.isArray(properties) || properties.length === 0) {
      return <p>No properties available.</p>;
    }

    return propertiesToDisplay.map((property) => {
      let imageUrls = '';

      if (property.propertyPictures && property.propertyPictures.length > 0) {
        const firstImageUrl = property.propertyPictures[0].property_pictures;
        imageUrls = firstImageUrl.split(',').map((url) => url.trim());
      }

      const imageUrl = imageUrls.length > 0 ? imageUrls[0] : null;

      return (
        <div
          key={property.id}
          className="card shadow-xl transition-transform transform hover:scale-110"
        >
          <Link href={`/property/${property.id}`} passHref>
            <a>
              <div className="">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`property cover`}
                    className="w-full h-48 object-cover rounded-t-lg"
                    width={400}
                    height={200}
                  />
                ) : (
                  <p>No pictures available</p>
                )}
              </div>
            </a>
          </Link>
          <Link href={`/property/${property.id}`} passHref>
            <a className="text-slate-700 font-semibold truncate flex-1">
              <div className="landing-text p-4">
                <h2 className="card-title text-center text-lg">
                  {property.name}
                </h2>
                <h6 className="text-center">{property.address}</h6>
                {property.rooms && property.rooms.length > 0 && (
                  <p className="text-center">
                    {formatPrice(property.rooms[0].regularPrice)} night
                  </p>
                )}
              </div>
            </a>
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <FilterSection />
      </div>
      <div className="landing-page grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
        {renderProperties()}
      </div>
      <Pagination
        page={page}
        lastPage={Math.ceil(properties.length / itemsPerPage)}
        setPage={setPage}
      />
    </div>
  );
};

export default PropertyList;
