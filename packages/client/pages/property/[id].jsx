'use client';
import Navbar from '../../src/components/Navbar/Navbar';
import Footer from '../../src/components/Footer/Footer';
import api from '../../src/config/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  User,
  House,
  ArrowCircleLeft,
  ArrowCircleRight,
  MapPinLine,
  Bed,
  Toilet,
  CheckCircle,
  Warning,
} from '@phosphor-icons/react';
import Image from 'next/image';

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

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  };

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

  const tenantName = property.Tenant ? property.Tenant.name : 'Unknown Tenant';

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1,
    );
  };

  let imageUrls = [];

  if (property.propertyPictures && property.propertyPictures.length > 0) {
    const firstImageUrl = property.propertyPictures[0].property_pictures;
    imageUrls = firstImageUrl.split(',').map((url) => url.trim());
  }

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

  const isWeekend = (date) => {
    if (date && typeof date.getDay === 'function') {
      const day = date.getDay();
      return day === 6 || day === 0;
    }
    return false;
  };

  const getPrice = (room, nights, isWeekend = false) => {
    const pricePerNight =
      isWeekend && room.specialPrice ? room.specialPrice : room.regularPrice;

    return pricePerNight * nights;
  };

  const generateRandomCode = (length) => {
    let result = 'BOOK';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length - 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const bookNow = async () => {
    try {
      updateBookNowButtonStatus(checkInDate, checkOutDate, guests);

      if (!checkInDate || !checkOutDate || !guests) {
        return;
      }

      const totalGuests = Number(guests.adults) + Number(guests.children);

      function generateBookingCode() {
        const prefix = 'BOOK';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return prefix + randomNum;
      }

      const bookingCode = generateBookingCode();

      const orderData = {
        user_id: 1,
        room_id: property.rooms[0].id,
        check_in_date: checkInDate.toISOString().split('T')[0],
        check_out_date: checkOutDate.toISOString().split('T')[0],
        guests: totalGuests,
        booking_code: generateRandomCode(10),
        price: property.rooms[0].regularPrice * totalNights,
        specialPrice: property.rooms[0].specialPrice,
        total_invoice: property.rooms[0].specialPrice
          ? property.rooms[0].specialPrice * totalNights
          : property.rooms[0].regularPrice * totalNights,
        payment_proof: null,
        payment_status: null,
        payment_date: null,
        booking_status: null,
        cancel_reason: '',
        reject_reason: '',
      };

      const response = await api.post('/orders', orderData);

      if (response.ok || response.status === 201) {
        router.push('/orders');
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
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 bg-color-primary rounded-md shadow-lg">
        <div className="relative">
          <div
            id="carousel"
            className="carousel-container overflow-hidden rounded-t-md h-[400px]"
          >
            <div
              className="carousel-wrapper transition-transform flex"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 0.5s ease',
                height: '100%',
              }}
            >
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className="w-full h-full flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={`Property Image`}
                    className="w-full h-full rounded-t-md object-cover"
                    width={1200}
                    height={700}
                  />
                </div>
              ))}
            </div>

            {imageUrls.length > 1 && (
              <div className="absolute flex justify-between w-full -mt-8">
                <button className="btn btn-circle" onClick={prevSlide}>
                  <ArrowCircleLeft size={32} />
                </button>
                <button className="btn btn-circle" onClick={nextSlide}>
                  <ArrowCircleRight size={32} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-3xl font-semibold mb-4">{property.name}</h1>
          <div className="flex items-center mb-2">
            <User size={20} />
            <h2 className="font-semibold ml-2">{`${tenantName
              .charAt(0)
              .toUpperCase()}${tenantName.slice(1)}'s Room`}</h2>
          </div>
          <div className="mb-6">
            <h5 className="text-xl font-semibold mb-2">About this rooms</h5>
            <p className="text-gray-600">{property.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <p className="text-xl font-semibold mb-2">Property Details</p>
              <div className="flex items-center mb-2">
                <House size={20} className="mr-2" />
                <p>{property.rooms[0].type_room}</p>
              </div>
              <div className="flex items-center mb-2">
                <MapPinLine size={20} className="mr-2" />
                <p>{property.address}</p>
              </div>
              <div className="flex items-center mb-2">
                {property.sell ? (
                  <Warning size={20} className="text-color-lightred mr-2" />
                ) : (
                  <CheckCircle size={20} className="text-color-pallete4 mr-2" />
                )}
                {property.sell ? 'Sold' : 'Available'}
              </div>
              <div className="flex items-center mb-2">
                {property.rent ? (
                  <Warning size={20} className="text-color-lightred mr-2" />
                ) : (
                  <CheckCircle size={20} className="text-color-pallete4 mr-2" />
                )}
                {property.rent ? 'Rented' : 'Available'}
              </div>
              <div className="flex items-center mb-2">
                <Bed size={20} className="mr-2" />
                {property.rooms[0].bedrooms || 'N/A'} Bedrooms
              </div>
              <div className="flex items-center mb-2">
                <Toilet size={20} className="mr-2" />
                {property.rooms[0].bathrooms} Bathrooms
              </div>
              <p>
                <span className="font-semibold">Price:</span>{' '}
                {formatPrice(property.rooms[0].regularPrice)} / Night
              </p>
              {property.rooms[0].offer && (
                <p>
                  <span className="font-semibold">Special Price:</span>{' '}
                  {formatPrice(property.rooms[0].specialPrice)} / Night
                </p>
              )}
              <p>
                <span className="font-semibold">Furnished :</span>{' '}
                {property.rooms[0].furnished}
              </p>
            </div>
            <div>
              <div className="flex">
                {isWeekend(checkInDate) &&
                isWeekend(checkOutDate) &&
                property.rooms[0].specialPrice ? (
                  <div className="mb-4">
                    <span className="font-semibold">Weekend&apos Price :</span>{' '}
                    {formatPrice(
                      getPrice(property.rooms[0], totalNights, true),
                    )}
                    {' / '}
                    {totalNights} Nights
                    <p className="text-xs">(Price is updated due to Weekend)</p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="font-semibold">Price :</span>{' '}
                    {formatPrice(getPrice(property.rooms[0], totalNights))}
                    {' / '}
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
                      className="ml-2 border rounded-md p-2 w-full sm:w-auto"
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
                      className="ml-2 border rounded-md p-2 w-full sm:w-auto"
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
                        onChange={(e) =>
                          updateGuests('children', e.target.value)
                        }
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
      <div className="relative mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetails;
