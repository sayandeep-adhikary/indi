import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bgSmoke from "../assets/bgSmoke2.png";
import {
  Box,
  Button,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const [movieDetailsLoaded, setMovieDetailsLoaded] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const movieDetail = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=56c9c02aa32a418f08a672779aa2d077`
        );
        setMovieDetails(movieDetail.data);
        // console.log(movieDetails);
      } catch (error) {
      } finally {
        setMovieDetailsLoaded(true);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Skeleton isLoaded={movieDetailsLoaded}>
        <BannerComponent movieDetails={movieDetails} />
      </Skeleton>
    </>
  );
}

function BannerComponent({ movieDetails }) {
  return (
    movieDetails && (
      <Carousel
        autoPlay={true}
        infiniteLoop
        interval={3000}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        swipeable={true}
        showIndicators={false}
      >
        <Box pos={"relative"}>
          <picture>
            <source
              media="(min-width: 500px)"
              srcSet={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
            />
            <Image
              height={"100vh"}
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              filter={"brightness(75%)"}
            />
          </picture>
          <VStack
            pos={"absolute"}
            display={"flex"}
            top={["5rem", "6rem"]}
            left={["1rem", "2.5rem"]}
            zIndex={10}
            alignItems={"flex-start"}
            textAlign={"left"}
            gap={5}
          >
            <Heading
              color={"white"}
              fontSize={["2.5rem", "5rem"]}
              fontFamily={"'Bebas Neue', sans-serif"}
              letterSpacing={"2px"}
              textTransform={"uppercase"}
              fontWeight={900}
              pr={5}
            >
              {movieDetails.title}
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
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => genre.name).join(", ")}{" "}
              | {movieDetails.release_date} | {movieDetails.runtime}
              {" Min."}
            </Text>
            <Text
              color={"white"}
              fontSize={[["0.9rem", "1rem"]]}
              fontFamily={"'Inter', sans-serif"}
              letterSpacing={"1px"}
              paddingRight={["1rem", "40rem"]}
              lineHeight={"180%"}
            >
              {movieDetails.overview}
            </Text>
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
          </VStack>
          <Image
            src={bgSmoke}
            alt="bgSmoke"
            pos={"absolute"}
            height={"100vh"}
            zIndex={[3]}
            opacity={0.9}
          />
        </Box>
      </Carousel>
    )
    // <></>
  );
}
