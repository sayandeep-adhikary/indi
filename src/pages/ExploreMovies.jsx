import React, { useEffect } from "react";
import MovieList from "../components/MovieList";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function ExploreMovies() {
  const API_KEY = '56c9c02aa32a418f08a672779aa2d077';
  useEffect(() => {
    document.title = "INDI - Explore Movies";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box p={[4, 8]} bg={"linear-gradient(to right, #0f2027, #203a43, #2c5364)"}>
        <Heading
          color={"white"}
          fontSize={["2.5rem", "5.5rem"]}
          fontFamily={"'Bebas Neue', sans-serif"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          fontWeight={900}
          pt={20}
        >
          Movies
        </Heading>
        <Text
          color={"gray.400"}
          fontSize={["0.9rem", "1rem"]}
          fontFamily={"'Inter', sans-serif"}
          letterSpacing={"2px"}
          fontWeight={900}
          pr={['0', '30rem']}
          pb={10}
          lineHeight={"180%"}
        >
          Movies move us like nothing else can, whether they’re scary, funny,
          dramatic, romantic or anywhere in-between. So many titles, so much to
          experience.
        </Text>
      </Box>
      <MovieList
        title="Action"
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`}
      />
      <MovieList
        title="Comedy"
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`}
      />
      <MovieList
        title="Romance"
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`}
      />
      <MovieList
        title="Horror"
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`}
      />
      <MovieList
        title="Animation"
        url={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`}
      />
    </>
  );
}
