'use client';
import api from '../../src/config/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PropertyDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guests, setGuests] = useState({ adults: 0, children: 0 });
  const [showGuestsInput, setShowGuestsInput] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalNights, setTotalNights] = useState(1);
  const [info, setInfo] = useState('');

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await api.get(`/property/${id}`);
        console.log('API Response', response.data);
        const propertyData = response.data.data.property;
        setProperty(propertyData);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  if (!property) {
    return <p>Loading...</p>;
  }

  const nextSlide = () => {
    console.log('Next Slide Clicked');
    setCurrentIndex((prevIndex) =>
      prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const prevSlide = () => {
    console.log('Prev Slide Clicked');
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1,
    );
  };

  console.log('Property Pictures:', property.propertyPictures);
  let imageUrls = [];

  if (property.propertyPictures && property.propertyPictures.length > 0) {
    const firstImageUrl = property.propertyPictures[0].property_pictures;
    imageUrls = firstImageUrl.split(',').map((url) => url.trim());
  }

  console.log('Image URLs:', imageUrls);

  const addGuests = () => {
    setShowGuestsInput(true);
  };

  const updateGuests = (type, value) => {
    setGuests({ ...guests, [type]: value });
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    updateTotalNights(date, checkOutDate);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    updateTotalNights(checkInDate, date);
  };

  const updateTotalNights = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      setTotalNights(nights > 0 ? nights : 1);
    }
  };

  const bookNow = async () => {
    try {
      updateBookNowButtonStatus(checkInDate, checkOutDate, guests);

      if (!checkInDate || !checkOutDate) {
        console.error('Please select check-in and check-out dates.');

        return;
      }

      const totalGuests = Number(guests.adults) + Number(guests.children);

      const orderData = {
        user_id: 1,
        room_id: property.rooms[0].id,
        check_in_date: checkInDate.toISOString().split('T')[0],
        check_out_date: checkOutDate.toISOString().split('T')[0],
        guests: totalGuests,
        booking_code: 'DEFAULT_BOOKING_CODE',
        price: property.rooms[0].regularPrice * totalNights,
        total_invoice: 0,
        payment_proof: 'default',
        payment_status: null,
        payment_date: null,
        booking_status: 'WAITING_FOR_PAYMENT',
        cancel_reason: '',
        reject_reason: '',
      };

      const response = await api.post('/orders', orderData);

      if (response.ok || response.status === 201) {
        alert('Success! Your order has been created.');
      } else {
        console.error(
          'Error creating order:',
          response.data.message || 'Unknown error',
        );
      }
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  const updateBookNowButtonStatus = (checkIn, checkOut, guests) => {
    const areDatesSet = checkIn && checkOut;
    const isGuestsSet = guests.adults > 0 || guests.children > 0;

    if (!areDatesSet) {
      setInfo('Please select check-in and check-out dates.');
    } else if (!isGuestsSet) {
      setInfo('Please specify the number of guests.');
    } else {
      setInfo('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-md shadow-lg">
      <div className="relative">
        <div
          id="carousel"
          className="carousel-container overflow-hidden rounded-t-md"
        >
          <div
            className="carousel-wrapper transition-transform flex"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s ease',
            }}
          >
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <img
                  src={imageUrl}
                  alt={`Property Image`}
                  className="w-full h-full object-cover rounded-t-md"
                  onError={() =>
                    console.error(`Error loading image: ${imageUrl}`)
                  }
                  onLoad={() =>
                    console.log(`Image loaded successfully: ${imageUrl}`)
                  }
                />
              </div>
            ))}
          </div>
          {imageUrls.length > 1 && (
            <div className="absolute flex justify-between w-full -mt-8">
              <button
                className="btn btn-circle text-white bg-gray-800"
                onClick={prevSlide}
              >
                ❮
              </button>
              <button
                className="btn btn-circle text-white bg-gray-800"
                onClick={nextSlide}
              >
                ❯
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-4">{property.name}</h1>
        <p className="text-gray-600 mb-6">{property.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <p className="text-xl font-semibold mb-2">Property Details</p>
            <p>
              <span className="font-semibold">Address:</span> {property.address}
            </p>
            <p>
              <span className="font-semibold">Sell:</span>{' '}
              {property.sell ? 'Sold' : 'Available'}
            </p>
            <p>
              <span className="font-semibold">Rent:</span>{' '}
              {property.rent ? 'Rented' : 'Available'}
            </p>
            <p>
              <span className="font-semibold">Bedrooms:</span>{' '}
              {property.rooms[0].bedrooms || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Bathrooms:</span>{' '}
              {property.rooms[0].bathrooms}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{' '}
              {property.rooms[0].regularPrice} / Night
            </p>
            {property.rooms[0].offer && (
              <p>
                <span className="font-semibold">Discounted Price:</span>{' '}
                {property.rooms[0].discountPrice} Rp / Night
              </p>
            )}
            <p>
              <span className="font-semibold">Furnished:</span>{' '}
              {property.rooms[0].furnished ? 'Yes' : 'No'}
            </p>
            <p>
              <span className="font-semibold">Parking:</span>{' '}
              {property.parking ? 'Yes' : 'No'}
            </p>
          </div>
          <div>
            <div className="flex">
              <div className="mb-4">
                <span className="font-semibold text-2xl">Price :</span> Rp{' '}
                {property.rooms[0].regularPrice * totalNights} / {totalNights}{' '}
                Nights
              </div>
              {property.rooms[0].offer && (
                <div className="mb-4">
                  <span className="font-semibold">Discounted Price :</span> Rp{' '}
                  {property.rooms[0].discountPrice * totalNights} /{' '}
                  {totalNights} Nights
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-semibold">Check-in :</span>
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleCheckInDateChange}
                    placeholderText="Select date"
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    className="ml-2 border rounded-md p-2"
                  />
                </div>
                <div>
                  <span className="font-semibold">Check-out :</span>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={handleCheckOutDateChange}
                    placeholderText="Select date"
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={checkInDate}
                    className="ml-2 border rounded-md p-2"
                  />
                </div>
              </div>
            </div>

            {showGuestsInput && (
              <div className="mb-4">
                <span className="font-semibold">Guests :</span>
                <div className="flex">
                  <div className="mr-4">
                    <label className="block mb-1">Adults :</label>
                    <input
                      type="number"
                      value={guests.adults}
                      onChange={(e) => updateGuests('adults', e.target.value)}
                      className="border rounded-md p-2"
                      min="1"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Children :</label>
                    <input
                      type="number"
                      value={guests.children}
                      onChange={(e) => updateGuests('children', e.target.value)}
                      className="border rounded-md p-2"
                      min="0"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="mb-4">
              <button className="btn btn-secondary" onClick={addGuests}>
                Add Guests
              </button>
            </div>
            <div className="flex justify-end">
              <div className="mb-4">
                {info && <p className="text-color-red mb-4">{info}</p>}
              </div>
              <button className="btn btn-primary" onClick={bookNow}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
