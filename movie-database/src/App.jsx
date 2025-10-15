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

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

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

  const addToFavorites = (movie) => {
    const alreadyAdded = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (!alreadyAdded) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const removeFromFavorites = (id) => {
    const updated = favorites.filter((fav) => fav.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        Gbemi's Movie Hub
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex justify-center flex-wrap gap-2 mb-8"
      >
        <input
          type="text"
          placeholder="Search movie..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className="p-2 w-60 sm:w-80 text-black rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && !selectedMovie && (
        <>
          <MovieList movies={movies} onMovieClick={handleMovieClick} />
          {favorites.length > 0 && (
            <FavoritesList
              favorites={favorites}
              onRemove={removeFromFavorites}
            />
          )}
        </>
      )}

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
