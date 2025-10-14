import React, { useState, useEffect } from "react";
import "./index.css";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import FavoritesList from "./components/FavoritesList";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (movieName === "") {
      setError("Please type something");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);
    setSelectedMovie(null);

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

  const handleMovieClick = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=3e1e8179&i=${id}&plot=full`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch {
      setError("Error fetching movie details");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (!exists) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
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

      {!loading && !error && !selectedMovie && (
        <>
          <MovieList
            movies={movies}
            onMovieClick={handleMovieClick}
          />
          <FavoritesList favorites={favorites} />
        </>
      )}

      {selectedMovie && (
        <div>
          <MovieDetails
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
          />
          <button
            onClick={() => addToFavorites(selectedMovie)}
            className="bg-green-600 px-4 py-2 rounded mt-4 hover:bg-green-700"
          >
            Add to Favorites
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
