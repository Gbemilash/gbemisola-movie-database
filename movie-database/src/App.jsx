import React, { useState, useEffect } from "react";
import "./index.css";
import MovieCarousel from "./components/MovieCarousel"; 
import MovieDetails from "./components/MovieDetails";
import FavoritesList from "./components/FavoritesList";
import LandingPage from "./components/LandingPage";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load favorites
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Search movies from OMDB API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (movieName.trim() === "") {
      setError("Please enter a movie name");
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
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // This will fetch the movie details
  const handleMovieClick = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=3e1e8179&i=${id}&plot=short`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      setError("Error loading movie");
    } finally {
      setLoading(false);
    }
  };

  // Add a movie to favorites
  const addToFavorites = (movie) => {
    const alreadyAdded = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (!alreadyAdded) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  // Remove a movie from favorites
  const removeFromFavorites = (id) => {
    const updated = favorites.filter((fav) => fav.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-4">
        Gbemi's Movie Hub
      </h1>

      {/* My Intro text */}
      <p className="text-center text-gray-300 mb-6">
        What are we watching today? Search for a movie below!
      </p>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 w-full px-4"
      >
        <input
          type="text"
          placeholder="Search movie..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className="p-3 sm:p-4 w-full sm:w-96 text-black text-lg rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold text-lg px-6 py-3 rounded shadow-md hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto"
        >
          Search
        </button>
      </form>

      {/* The loading and error messages */}
      {loading && (
        <p className="text-center text-gray-400 animate-pulse">Loading...</p>
      )}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* My movie lists */}
      {!loading && !error && !selectedMovie && (
        <>
          {movies.length > 0 ? (
            <MovieCarousel
              title={`Search results for "${movieName}"`}
              movies={movies}
              onMovieClick={handleMovieClick}
            />
          ) : (
            <LandingPage onMovieClick={handleMovieClick} />
          )}

          {/* My Favorites section */}
          {favorites.length > 0 && (
            <FavoritesList
              favorites={favorites}
              onRemove={removeFromFavorites}
            />
          )}
        </>
      )}

      {/* Selected movie details */}
      {selectedMovie && (
        <div className="mt-6">
          <MovieDetails
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
          />
          <button
            onClick={() => addToFavorites(selectedMovie)}
            className="bg-green-600 px-4 py-2 rounded mt-4 hover:bg-green-500"
          >
            Add to Favorites
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
