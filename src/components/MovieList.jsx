import { Box, Heading, Image, SimpleGrid, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieList({ title = "Movies", url = "" }) {
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setMovies(Array.from(response.data.results));
      } catch (error) {
        // setError(true);
      } finally {
        setLoaded(true);
      }
    };
    fetchData();
    // console.log(movies)
  }, [url]);

  return (
    <Box p={[4, 8]} py={10} bgColor={"#232323"}>
      <Heading color={"white"} fontFamily={"'Inter', sans-serif"}>
        {title}
      </Heading>
      <SimpleGrid columns={[2, null, 5]} spacing={"1rem"} my={5}>
        {movies.map((movie) => (
          <Skeleton isLoaded={loaded} key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <Image
                borderRadius={"1rem"}
                height={['16rem', '22rem']}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                _hover={{ transform: "scale(1.02)", transition: "all 0.5s", boxShadow: '0 0 20px #FF4E4E' }}
              />
            </Link>
          </Skeleton>
        ))}
        <Image src={""} />
      </SimpleGrid>
    </Box>
  );
}

// https://www.youtube.com/watch?v=qvCogW-N-HE
// https://api.themoviedb.org/3/movie/157336/videos?api_key=56c9c02aa32a418f08a672779aa2d077
// https://api.themoviedb.org/3/movie/157336/images?api_key=56c9c02aa32a418f08a672779aa2d077
// https://api.themoviedb.org/3/movie/157336?api_key=56c9c02aa32a418f08a672779aa2d077
