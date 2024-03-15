import React, { useEffect, useState } from "react";
import { db, useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { onValue, ref } from "firebase/database";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import noPoster from "../assets/noPoster.jpg";

export default function Favorites() {
  const [favourites, setFavourites] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const isLoggedIn = useFirebase().isLoggedIn;
  const user = useFirebase().user;
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "INDI - Favorites";
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      navigate("/login", { state: { prevUrl: "/favorites" } });
    }
    const getFavorites = () => {
      if (user) {
        const dbRef = ref(db, `users/${user.uid}/favourites`);
        onValue(dbRef, (snapshot) => {
          const data = snapshot?.val() || {};
          const arr = Object?.values(data);
          setFavourites(arr);
          setLoaded(true);
        });
      }
    };
    getFavorites();
  }, [isLoggedIn, navigate, user]);
  useEffect(() => {}, [favourites]);

  return (
    <Box p={[4, 8]} py={10} bg={"linear-gradient(to top, #41295a, #2f0743)"}>
      <VStack py={20} align={"left"}>
        <Heading color={"white"} fontFamily={"'Inter', sans-serif"}>
          Your Favourites
        </Heading>
        {favourites.length > 0 ? (
          <SimpleGrid columns={[2, null, 5]} spacing={"1rem"} my={10}>
            {favourites.map((movie) => (
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
                      {movie.genres.map((genre) => {
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
                      })}
                    </Wrap>
                    <Image
                      borderRadius={"1rem"}
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
            ))}
            <Image src={""} />
          </SimpleGrid>
        ) : (
          <Flex justifyContent={"center"} pt={10}>
            <lottie-player
              src="https://lottie.host/6ec64c36-a850-45d7-a82b-7f3ed5b97941/Pe03OJeJ13.json"
              background="#41295a, #2f0743"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          </Flex>
        )}
      </VStack>
    </Box>
  );
}
