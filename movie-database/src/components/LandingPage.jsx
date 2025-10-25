import React, { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel";

function LandingPage({ onMovieClick }) {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    fetch("https://www.omdbapi.com/?apikey=3e1e8179&s=avengers")
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setTrending(data.Search);
        }
      });

    fetch("https://www.omdbapi.com/?apikey=3e1e8179&s=batman")
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setPopular(data.Search);
        }
      });

    fetch("https://www.omdbapi.com/?apikey=3e1e8179&s=inception")
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setTopRated(data.Search);
        }
      });
  }, []);

  return (
    <div style={{ width: "100%", padding: "10px" }}>
      <MovieCarousel
        title="Trending Now"
        movies={trending}
        onMovieClick={onMovieClick}
      />
      <MovieCarousel
        title="Popular Movies"
        movies={popular}
        onMovieClick={onMovieClick}
      />
      <MovieCarousel
        title="Top Rated"
        movies={topRated}
        onMovieClick={onMovieClick}
      />
    </div>
  );
}

export default LandingPage;
