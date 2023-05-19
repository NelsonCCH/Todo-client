// components/SearchBar.js
import "../styles/searchBar.css";

// as user type in search bar, it triggers the todo list's filter
export function SearchBar({ setSearchTerm }) {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="search-input"
      onChange={handleSearch}
    />
  );
}
