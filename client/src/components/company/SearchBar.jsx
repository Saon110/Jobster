import React, { useState } from 'react';

const SearchBar = ({ options = [], defaultOption, onSearch }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption || '');
  const [searchText, setSearchText] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Reset min and max salary when option changes
    setMinSalary('');
    setMaxSalary('');
  };

  const handleSearchTextChange = (event) => setSearchText(event.target.value);
  const handleMinSalaryChange = (event) => setMinSalary(event.target.value);
  const handleMaxSalaryChange = (event) => setMaxSalary(event.target.value);

  const handleSearch = () => {
    if (selectedOption === 'Salary Range') {
      // Perform search by salary range
      onSearch(selectedOption, `${minSalary}-${maxSalary}`);
    } else {
      // Perform search by other criteria
      onSearch(selectedOption, searchText);
    }
  };

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

      {selectedOption === 'Salary Range' ? (
        <>
          <input
            type="number"
            value={minSalary}
            onChange={handleMinSalaryChange}
            placeholder="Min Salary"
            style={{ fontSize: '16px', padding: '8px', marginRight: '8px' }}
          />
          -
          <input
            type="number"
            value={maxSalary}
            onChange={handleMaxSalaryChange}
            placeholder="Max Salary"
            style={{ fontSize: '16px', padding: '8px', marginLeft: '8px', marginRight: '8px' }}
          />
        </>
      ) : (
        <input
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search..."
          style={{ fontSize: '16px', padding: '8px', marginRight: '8px' }}
        />
      )}

      <button
        type="button"
        onClick={handleSearch}
        style={{ fontSize: '16px', padding: '8px' }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
