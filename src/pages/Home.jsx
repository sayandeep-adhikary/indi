import React, { useEffect } from "react";
import CarouselComponent from "../components/Carousel";
import MovieList from "../components/MovieList";

export default function Home() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    document.title = "INDI";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CarouselComponent />
      <MovieList
        title="Popular Right Now"
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`}
        showSortBy={true}
      />
      <MovieList
        title="Trending This Week"
        url={`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`}
        showSortBy={false}
      />
      <MovieList
        title="Top Rated Films"
        url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
        showSortBy={false}
      />
    </>
  );
}
