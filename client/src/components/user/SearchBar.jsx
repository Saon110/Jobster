import React, { useState } from 'react';

const SearchBar = ({ options = [], defaultOption, onSearch }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption || '');
  const [searchText, setSearchText] = useState('');

  const handleOptionChange = (event) => setSelectedOption(event.target.value);
  const handleSearchTextChange = (event) => setSearchText(event.target.value);
  const handleSearch = () => onSearch(selectedOption, searchText);

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        style={{
          fontSize: '16px',
          padding: '8px',
          marginRight: '8px',
          width: '150px',
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Search..."
        style={{ fontSize: '16px', padding: '8px', marginLeft: '8px' }}
      />

      <button
        type="button"
        onClick={handleSearch}
        style={{ fontSize: '16px', padding: '8px', marginLeft: '8px' }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
