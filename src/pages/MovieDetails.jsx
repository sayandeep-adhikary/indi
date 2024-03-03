import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bgSmoke from "../assets/bgSmoke2.png";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OfficialVideos from "../components/OfficialVideos";
// import Details from "../components/Details";
import TopCast from "../components/TopCast";
import MovieList from "../components/MovieList";
import noBackdrop from "../assets/abstract.jpg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFirebase } from "../context/Firebase";

export default function MovieDetails() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [movieDetailsLoaded, setMovieDetailsLoaded] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieImages, setMovieImages] = useState([]);
  const [trailer, setTrailer] = useState({
    results: [{ key: "" }],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useFirebase().isLoggedIn;
  const { id } = useParams();
  useEffect(() => {
    document.title = "INDI - Movie Details";
    if (!isLoggedIn){
      navigate("/login", { state: { prevUrl: location.pathname } });
    }
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const movieDetail = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const movieImages = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`
        );
        const trailers = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        setMovieDetails(movieDetail.data);
        // console.log(movieDetails);
        setMovieImages(movieImages.data);
        setTrailer(trailers.data);
        // console.log(movieDetails);
      } catch (error) {
      } finally {
        setMovieDetailsLoaded(true);
      }
    };
    fetchData();
  }, [id, API_KEY, isLoggedIn, navigate, location.pathname]);

  return (
    <>
      <Skeleton isLoaded={movieDetailsLoaded}>
        <BannerComponent
          movieDetails={movieDetails}
          trailer={trailer}
          movieImages={movieImages}
        />
        {/* {movieImages.backdrops?.slice(0, 5).map((image, index) => {})} */}
      </Skeleton>
      <OfficialVideos />
      {/* <Details movieDetails={movieDetails} movieImages={movieImages} /> */}
      <TopCast id={id} />
      <MovieList
        title="Similar Movies"
        url={`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`}
      />
    </>
  );
}

function BannerComponent({ movieDetails, trailer }) {
  // console.log(movieDetails);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    movieDetails &&
    trailer && (
      <>
        <Carousel
          autoPlay={true}
          infiniteLoop
          interval={4000}
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
                srcSet={
                  movieDetails.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
                    : noBackdrop
                }
              />
              <Image
                height={"100vh"}
                src={
                  movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`
                    : noBackdrop
                }
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
                  movieDetails.genres
                    .map((genre) => genre.name)
                    .join(", ")}{" "}
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
                {movieDetails?.overview?.length > 300
                  ? movieDetails.overview.slice(0, 300) + "..."
                  : movieDetails.overview}
              </Text>
              <HStack gap={5}>
                <Box w={"50px"} bg={"white"} p={1} borderRadius={"full"}>
                  <CircularProgressbar
                    value={movieDetails.vote_average}
                    maxValue={10}
                    text={`${movieDetails?.vote_average?.toPrecision(2)}`}
                    styles={buildStyles({
                      textColor: "black",
                      pathColor:
                        movieDetails.vote_average > 7
                          ? "#18864B"
                          : movieDetails.vote_average > 4
                          ? "#FFA500"
                          : "red",
                      trailColor: "white",
                      textSize: "2.5rem",
                    })}
                  />
                </Box>
                <Button
                  leftIcon={<FaPlay />}
                  color={"#FF4E4E"}
                  variant={"outline"}
                  border={"1px solid #FF4E4E"}
                  p={6}
                  borderRadius={"full"}
                  _hover={{ bg: "#FF4E4E", color: "white" }}
                  onClick={onOpen}
                >
                  Watch Trailer
                </Button>
              </HStack>
            </VStack>
            <Image
              src={bgSmoke}
              alt="bgSmoke"
              pos={"absolute"}
              height={"100vh"}
              zIndex={10}
              opacity={0.9}
            />
          </Box>
        </Carousel>
        <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent bgColor={"transparent"}>
            <ModalCloseButton color={"gray.200"} />
            <ModalBody
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <iframe
                width="1000"
                title={trailer?.results[0]?.name}
                style={{ borderRadius: "1rem", boxShadow: "0 0 20px #FF4E4E" }}
                height="500"
                autoPlay={true}
                allowFullScreen={true}
                src={`https://www.youtube.com/embed/${
                  trailer?.results.filter(
                    (video) => video.type === "Trailer"
                  )[0]?.key
                }`}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
    //
  );
}
