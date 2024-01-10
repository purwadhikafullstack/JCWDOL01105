import { useState, useEffect } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/router';

import api from '../../config/api';

const Search = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedGuests, setSelectedGuests] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchAction, setSearchAction] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [numberOfNights, setNumberOfNights] = useState(0);

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
    setSearchResults([]);
    setSearchAction(false);
  };

  const handleCalendarButtonClick = () => {
    setShowCalendar((prevShowCalendar) => !prevShowCalendar);
  };

  const tileDisabled = ({ date }) => {
    return date < new Date();
  };

  const tileClassName = ({ date, view }) => {
    if (
      selectedDateRange &&
      selectedDateRange[0] &&
      date >= selectedDateRange[0] &&
      date <= selectedDateRange[1]
    ) {
      return 'selected-range';
    }

    return '';
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

  const handleDateChange = (date) => {
    if (date.length === 1) {
      setSelectedDate(date[0]);
      setNumberOfNights(0);
    } else if (date.length === 2) {
      setSelectedDateRange(date);
      setNumberOfNights(calculateNumberOfNights(date[0], date[1]));
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calculateNumberOfNights = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const nights = Math.round(Math.abs((endDate - startDate) / oneDay));
    return nights;
  };

  const handleGuestChange = (event) => {
    setSelectedGuests(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const formattedDateRange =
        selectedDateRange &&
        selectedDateRange.length === 2 &&
        selectedDateRange.map((date) => date.toISOString());

      const params = {
        location: selectedLocation,
        startDate: formattedDateRange ? formattedDateRange[0] : '',
        endDate: formattedDateRange ? formattedDateRange[1] : '',
        guests: selectedGuests || '0',
      };

      const response = await api.get('/property/search', {
        params,
      });
      console.log('search params', params);

      setShowCalendar(false);

      const searchData = response.data;

      if (searchData.success) {
        setSearchResults(searchData.data);
        setSearchAction(true);
        console.log('Search results:', searchData.data);

        const searchUrl = `?location=${selectedLocation}`;
        router.push(searchUrl);
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
        const response = await api.get('/property/search', {
          params: router.query,
        });
        const searchData = response.data;

        if (searchData.success) {
          console.log('Initial search result', searchData.data);
          setSearchResults(searchData.data);
          setSearchAction(true);
        } else {
          console.error('Initial search failed', searchData.message);
        }
      } catch (error) {
        console.error('Error fetching', error.response);
      }
    };
    fetchData();
  }, [router.query]);

  return (
    <div className="relative">
      <div
        className={`search-container ${
          searchOpen ? 'search-open' : ''
        } w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer relative z-20`}
        onClick={toggleSearch}
      >
        <div className="search-body flex flex-row items-center justify-between">
          <div className="text-sm font-semibold px-6">
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="outline-none"
            >
              <option value="" className="hidden sm:block ">
                Destination
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block text-sm font-semibold px-6 flex-1 text-center">
            <button
              className="outline-none"
              onClick={handleCalendarButtonClick}
            >
              {selectedDateRange
                ? `${formatDate(selectedDateRange[0])} to ${formatDate(
                    selectedDateRange[1],
                  )}`
                : 'Select date'}
            </button>
            {showCalendar && (
              <div className="calendar-dropdown rounded-xl absolute top-full left-10 bg-color-primary z-30">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDateRange || selectedDate}
                  selectRange={true}
                  tileDisabled={tileDisabled}
                  tileClassName={tileClassName}
                  className="calendar"
                />
              </div>
            )}
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
              className="p-2 bg-color-primary rounded-full hover:bg-color-pallete1"
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
