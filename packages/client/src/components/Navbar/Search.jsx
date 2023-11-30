import { useState, useEffect } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGuests, setSelectedGuests] = useState('');

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

  const handleSearch = () => {
    console.log(
      'Search for :',
      `${selectedLocation}, ${selectedDate}, ${selectedGuests} Guest`,
    );
  };

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
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
              <option value="city3">City 3</option>
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
