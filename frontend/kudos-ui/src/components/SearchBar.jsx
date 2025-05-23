import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [input, setInput] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  const handleClear = () => {
    setInput('');
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form className="searchbar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search boards..."
        className="searchbar-input"
      />
      <button type="submit" className="searchbar-icon" title="Search">
        <FaSearch />
      </button>
      <button
        type="button"
        className="searchbar-icon"
        title="Clear"
        onClick={handleClear}
      >
        <FaTimes />
      </button>
    </form>
  );
};

export default SearchBar;



