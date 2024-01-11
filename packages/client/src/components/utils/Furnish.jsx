import React from 'react';
import {
  BowlFood,
  Drop,
  WifiHigh,
  Monitor,
  Bathtub,
  Barbell,
  Coffee,
} from '@phosphor-icons/react';

const FurnishOptions = ({ value, onChange, options }) => {
  const furnishOptions = [
    { icon: <BowlFood size={20} />, name: 'Breakfast' },
    { icon: <Drop size={20} />, name: 'Water Heater' },
    { icon: <WifiHigh size={20} />, name: 'Wifi' },
    { icon: <Monitor size={20} />, name: 'TV' },
    { icon: <Bathtub size={20} />, name: 'Bathtub' },
    { icon: <Barbell size={20} />, name: 'Small Gym' },
    { icon: <Coffee size={20} />, name: 'Coffee Pot' },
  ];

  return (
    <div className="flex items-center gap-2">
      <textarea
        type="text"
        placeholder="Furnished"
        className="border p-3 rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex flex-col items-start">
        <p>List a Furniture :</p>
        {furnishOptions.map((option) => (
          <div key={option.name} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={option.name}
              value={option.name}
              checked={value.includes(option.name)}
              onChange={(e) => {
                const updatedOptions = e.target.checked
                  ? [...value, option.name]
                  : value.filter((item) => item !== option.name);
                onChange(updatedOptions);
              }}
            />
            <label htmlFor={option.name} className="flex items-center gap-2">
              {option.icon} <span>{option.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnishOptions;
