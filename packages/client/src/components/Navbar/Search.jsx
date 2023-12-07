import { useState, useEffect } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { API_URL } from '../../config/api';
import axios from 'axios';
import { DateRangePicker } from 'react-date-range';

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedGuests, setSelectedGuests] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  const cities = [
    'Bali',
    'Makassar',
    'Palu',
    'Manado',
    'Jakarta',
    'Tangerang',
    'Bogor',
    'Depok',
    'Bekasi',
    'Semarang',
  ];

  const toggleSearch = () => {
    setSearchOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchOpen && !event.target.closest('.search-container')) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [searchOpen]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleGuestChange = (event) => {
    setSelectedGuests(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/property/search`, {
        params: {
          location: selectedLocation,
          date: selectedDate,
          guests: selectedGuests,
        },
      });

      const searchData = response.data;

      if (searchData.success) {
        console.log('Search result: ', searchData.data);
        setSearchResults(searchData.data);
      } else {
        console.error('Search failed', searchData.message);
      }
    } catch (error) {
      console.error('Error searching', error.response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/property/search`);
        const searchData = response.data;

        if (searchData.success) {
          console.log('Initial search result', searchData.data);
          setSearchResults(searchData.data);
        } else {
          console.error('Initial search failed', searchData.message);
        }
      } catch (error) {
        console.error('Error fetching', error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative">
      <div
        className="search-container border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        onClick={toggleSearch}
      >
        <div className="search-body flex flex-row items-center justify-between">
          <div className="text-sm font-semibold px-6">
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="outline-none"
            >
              <option value="">Destination</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block text-sm font-semibold px-6 flex-1 text-center">
            <input
              type="date"
              placeholder="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              className="outline-none"
            />
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">
              <input
                type="number"
                min="0"
                placeholder="Add guests"
                value={selectedGuests}
                onChange={handleGuestChange}
                className="outline-none"
              />
            </div>
            <div
              className="p-2 bg-color-pallete1 rounded-full text-white"
              onClick={handleSearch}
            >
              <MagnifyingGlass size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
