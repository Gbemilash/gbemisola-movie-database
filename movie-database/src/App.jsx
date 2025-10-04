import React, { useState } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold text-center mb-6">🎬 Movie Database</h1>
      <SearchBar onSearch={handleSearch} />
      {searchQuery && (
        <p className="text-center text-gray-400">
          You searched for: <span className="text-blue-400">{searchQuery}</span>
        </p>
      )}
    </div>
  );
}

export default App;
