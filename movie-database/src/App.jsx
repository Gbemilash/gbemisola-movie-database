import React, { useState } from "react";
import "./index.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (movieName === "") {
      setError("Please type something");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=3e1e8179&s=${movieName}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("No movies found");
      }
    } catch (err) {
      setError("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gbemi's Movies</h1>

      <form onSubmit={handleSearch} className="flex justify-center gap-2 mb-5">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className="p-2 text-black rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="bg-gray-800 p-3 rounded">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
              className="w-full h-64 object-cover rounded"
            />
            <h3 className="mt-2 text-sm font-semibold">{movie.Title}</h3>
            <p className="text-gray-400 text-xs">{movie.Year}</p>
          </div>
        ))}

        {movies.length === 0 && !loading && !error && (
          <p className="text-center text-gray-400 mt-6">
            What are we watching today? Search for a movie!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
