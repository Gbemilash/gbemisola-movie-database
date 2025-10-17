import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-2/3 p-2 rounded-l-md text-black outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 p-2 rounded-r-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
export default SearchBar;
