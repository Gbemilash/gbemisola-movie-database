import React from "react";
function MovieCarousel({ title, movies, onMovieClick }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2 style={{ marginLeft: "10px", fontSize: "20px" }}>{title}</h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "10px",
          gap: "10px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => onMovieClick(movie.imdbID)}
            style={{
              cursor: "pointer",
              textAlign: "center",
              minWidth: "150px",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "no-image.png"}
              alt={movie.Title}
              style={{
                width: "150px",
                height: "220px",
                borderRadius: "5px",
              }}
            />
            <p style={{ marginTop: "5px", fontSize: "14px" }}>{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieCarousel;
