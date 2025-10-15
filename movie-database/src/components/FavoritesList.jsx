import React from "react";

function FavoritesList({ favorites, onRemove }) {
  if (favorites.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No favorites added yet.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-3">My Favorite Movies</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((movie) => (
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
            <button
              onClick={() => onRemove(movie.imdbID)}
              className="bg-red-600 px-3 py-1 mt-2 rounded hover:bg-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;
