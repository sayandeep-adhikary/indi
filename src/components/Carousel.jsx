import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bgSmoke from "../assets/bgSmoke2.png";
import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import noBackdrop from "../assets/abstract.jpg";
import noPoster from "../assets/noPoster.jpg";

const genreObj = [
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

export default function CarouselComponent() {
  const API_KEY = '56c9c02aa32a418f08a672779aa2d077';
  const [popularMovies, setPopularMovies] = useState([]);
  // const [genres, setGenres] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const getPoularMovies = async () => {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setPopularMovies(movies.data.results);
    };
    getPoularMovies();
  }, [API_KEY]);

  return (
    
    popularMovies.length > 0 && <Carousel
      autoPlay={true}
      infiniteLoop
      interval={5000}
      showStatus={false}
      showThumbs={false}
      // showArrows={false}
      swipeable={true}
      showIndicators={false}
    >
      {popularMovies &&
        popularMovies.slice(0, 8).map((item) => (
          <Box pos={"relative"} key={item.id}>
            <picture style={{ filter: "brightness(95%)" }}>
              <source
                media="(min-width: 500px)"
                srcSet={
                  item.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                    : noBackdrop
                }
              />
              <Image
                height={["70vh", "100vh"]}
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                    : noPoster
                }
                alt={item.title}
                filter={"brightness(55%)"}
              />
            </picture>
            <VStack
              pos={"absolute"}
              // display={["none", "flex"]}
              top={["5rem", "6rem"]}
              left={["1rem", "2.5rem"]}
              zIndex={10}
              alignItems={"flex-start"}
              textAlign={"left"}
              gap={[2, 5]}
            >
              <Heading
                color={"white"}
                fontSize={["2.5rem", "5.5rem"]}
                fontFamily={"'Bebas Neue', sans-serif"}
                letterSpacing={"2px"}
                textTransform={"uppercase"}
                fontWeight={900}
                pr={5}
              >
                {item.title}
              </Heading>
              <Text
                color={"gray.400"}
                fontSize={["0.9rem", "1rem"]}
                fontFamily={"'Inter', sans-serif"}
                letterSpacing={"2px"}
                fontWeight={900}
                pr={5}
                lineHeight={"180%"}
              >
                {genreObj
                  .filter((genre) => item.genre_ids.includes(genre.id))
                  .map((genre) => genre.name)
                  .join(", ")} {" "}
                | {item.release_date}
              </Text>
              <Text
                color={"white"}
                fontSize={[["0.9rem", "1rem"]]}
                fontFamily={"'Inter', sans-serif"}
                letterSpacing={"1px"}
                paddingRight={["1rem", "40rem"]}
                lineHeight={"180%"}
              >
                {item?.overview?.length > 200
                  ? item.overview.slice(0, 200) + "..."
                  : item.overview}
              </Text>
              <Link to={`/movie/${item.id}`}>
                <Button
                  leftIcon={<FaPlay />}
                  color={"#FF4E4E"}
                  variant={"outline"}
                  border={"1px solid #FF4E4E"}
                  p={6}
                  borderRadius={"full"}
                  _hover={{ bg: "#FF4E4E", color: "white" }}
                >
                  Watch Now
                </Button>
              </Link>
            </VStack>
            <Image
              src={bgSmoke}
              alt="bgSmoke"
              pos={"absolute"}
              height={"100vh"}
              zIndex={[3]}
              opacity={1}
            />
          </Box>
        ))}
    </Carousel>
  );
}
// box-shadow: rgba(0, 0, 0, 0.45) 1px 1px 40px 0px inset;
