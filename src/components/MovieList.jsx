import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Image,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noPoster from "../assets/noPoster.jpg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import noResults from "../assets/noData.png";

export const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export default function MovieList({
  title = "Movies",
  url = "",
  query = "",
  showSortBy = true,
}) {
  // console.log("title = " + title + " url = " + url);
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sortBy, setSortBy] = useState("popularity.desc");
  // alert(sortBy)

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`${url}&sort_by=${sortBy}`)
          .then((res) => res.json())
          .catch((error) => {
            // setError(true);
          })
          .then((data) => {
            setMovies(data?.results ? data?.results : []);
            setLoaded(true);
          })
      } catch (error) {
        // setError(true);
      }
    };
    const timeOut = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeOut);
    // console.log(movies)
  }, [url, sortBy]);

  return (
    <Box p={[4, 8]} pt={20} bg={"linear-gradient(to right, #141e30, #243b55)"}>
      <Stack flexDirection={["column", "row"]} justifyContent={"space-between"}>
        <Heading color={"white"} fontFamily={"'Inter', sans-serif"}>
          {title}
        </Heading>
        {showSortBy && (
          <Select
            variant={"flushed"}
            size={"md"}
            color={"white"}
            maxW={"fit-content"}
            onChange={(e) => {
              setSortBy(e.currentTarget.value);
              // alert("Sorting by " + e.currentTarget.value);
            }}
            minW={"8rem"}
            defaultValue={"popularity.desc"}
          >
            <option value={"popularity.desc"} style={{ color: "black" }}>
              Popularity
            </option>
            <option value={"vote_average.desc"} style={{ color: "black" }}>
              Rating
            </option>
            <option value={"release_date.desc"} style={{ color: "black" }}>
              Release Date
            </option>
          </Select>
        )}
      </Stack>
      {query ? (
        movies && movies.length === 0 ? (
          // <Image
          //   w={["100%", "30%"]}
          //   src={noResults}
          //   alt="no data found"
          //   mx={"auto"}
          //   my={5}
          // />
          <Flex justifyContent={"center"} pt={10}>
            <lottie-player
              src="https://lottie.host/6ec64c36-a850-45d7-a82b-7f3ed5b97941/Pe03OJeJ13.json"
              background="#141e30, #243b55"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          </Flex>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <SimpleGrid columns={[2, null, 5]} spacing={"1rem"} my={10}>
        {loaded
          ? movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <Card
                  p={1}
                  bg={"transparent"}
                  color={"white"}
                  variant={"filled"}
                >
                  <Box pos={"relative"} mb={5}>
                    <Box
                      pos={"absolute"}
                      top={"-1.5rem"}
                      right={"1rem"}
                      w={"30%"}
                      bg={"white"}
                      zIndex={100}
                      p={1}
                      borderRadius={"full"}
                    >
                      <CircularProgressbar
                        value={movie.vote_average}
                        maxValue={10}
                        text={`${movie.vote_average.toPrecision(2)}`}
                        styles={buildStyles({
                          textColor: "black",
                          pathColor:
                            movie.vote_average > 7
                              ? "#18864B"
                              : movie.vote_average > 4
                              ? "#FFA500"
                              : "red",
                          trailColor: "white",
                          textSize: "2rem",
                        })}
                      />
                    </Box>
                    <Wrap
                      pos={"absolute"}
                      bottom={0}
                      right={0}
                      justify={"flex-end"}
                    >
                      {genres.map((genre) => {
                        if (movie.genre_ids.includes(genre.id)) {
                          return (
                            <WrapItem key={genre.id}>
                              <Badge
                                textTransform={"capitalize"}
                                bg={"red.500"}
                                color={"white"}
                                zIndex={100}
                                fontSize={"0.7rem"}
                              >
                                {genre.name}
                              </Badge>
                            </WrapItem>
                          );
                        }
                        return null;
                      })}
                    </Wrap>
                    <Image
                      borderRadius={"1rem"}
                      w={"100%"}
                      height={["16rem", "22rem"]}
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : noPoster
                      }
                      alt={movie.title}
                      _hover={{
                        transform: "scale(1.01)",
                        transition: "all 0.5s",
                        boxShadow: "0 0 20px #FF4E4E",
                      }}
                    />
                  </Box>
                  <Text
                    fontFamily={"'Inter', sans-serif"}
                    fontSize={"1.2rem"}
                    fontWeight={600}
                    mb={2}
                  >
                    {movie.title}
                  </Text>
                  <Text
                    fontFamily={"'Inter', sans-serif"}
                    fontSize={"1rem"}
                    color={"gray.400"}
                  >
                    {new Date(movie.release_date).toDateString().slice(4)}
                  </Text>
                </Card>
              </Link>
            ))
          : [...Array(20)].map((_, i) => (
              <Skeleton
                key={i}
                startColor={"#243b55"}
                endColor={"#141e30"}
                height={["16rem", "22rem"]}
                borderRadius={"1rem"}
              />
            ))}
      </SimpleGrid>
    </Box>
  );
}

// https://www.youtube.com/watch?v=qvCogW-N-HE
// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
// https://api.themoviedb.org/3/movie/157336/videos?api_key=56c9c02aa32a418f08a672779aa2d077
// https://api.themoviedb.org/3/movie/157336/images?api_key=56c9c02aa32a418f08a672779aa2d077
// https://api.themoviedb.org/3/movie/609681/credits?api_key=56c9c02aa32a418f08a672779aa2d077
// https://api.themoviedb.org/3/movie/157336?api_key=56c9c02aa32a418f08a672779aa2d077
// https://www.figma.com/file/Ubz9ElDzW2ML0hEJtxcx99/Video-Streaming-Website---Responsive-web-app-prototype-(Community)?type=design&node-id=0-1&mode=design&t=QgZpjKdHMiEe5xB5-0
// https://api.themoviedb.org/3/movie/{movie_id}/similar
