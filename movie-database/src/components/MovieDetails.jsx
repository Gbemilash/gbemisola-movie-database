import React from "react";

function MovieDetails({ movie, onBack }) {
  if (!movie) return null;

  return (
    <div className="bg-gray-800 p-4 rounded mt-5">
      <button
        onClick={onBack}
        className="bg-blue-600 px-3 py-1 rounded mb-4 hover:bg-blue-700"
      >
        Back
      </button>

      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/150"
          }
          alt={movie.Title}
          className="w-48 rounded"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
          <p className="text-sm text-gray-300 mb-2">{movie.Plot}</p>
          <p className="text-sm">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="text-sm">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="text-sm">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="text-sm">
            <strong>Rating:</strong> {movie.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
