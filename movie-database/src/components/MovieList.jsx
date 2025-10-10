import React from "react";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        What are we watching today? Search for a movie!
      </p>
    );
  }

  return (
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
    </div>
  );
}

export default MovieList;
