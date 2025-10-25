import React from "react";
import MovieCarousel from "./MovieCarousel";

function FavoritesList({ favorites, onRemove, onMovieClick }) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2 style={{ marginLeft: "10px", fontSize: "20px", marginBottom: "10px" }}>
        My Favorites
      </h2>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "10px",
          gap: "10px",
        }}
      >
        {favorites.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              position: "relative",
              cursor: "pointer",
              minWidth: "150px",
              textAlign: "center",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "no-image.png"}
              alt={movie.Title}
              onClick={() => onMovieClick(movie.imdbID)}
              style={{
                width: "150px",
                height: "220px",
                borderRadius: "5px",
              }}
            />
            <p style={{ marginTop: "5px", fontSize: "14px" }}>{movie.Title}</p>

            {/* My Remove button overlay */}
            <button
              onClick={() => onRemove(movie.imdbID)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "rgba(220, 38, 38, 0.8)", 
                color: "white",
                border: "none",
                borderRadius: "3px",
                padding: "2px 5px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;
