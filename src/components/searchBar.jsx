// components/SearchBar.js
import "../styles/searchBar.css";

export function SearchBar({ setSearchTerm }) {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="input"
      onChange={handleSearch}
    />
  );
}
