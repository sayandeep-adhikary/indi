import React, { useEffect, useState } from "react";
import CarouselComponent from "../components/Carousel";
import MovieList from "../components/MovieList";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Home() {
  const API_KEY = "56c9c02aa32a418f08a672779aa2d077";
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.title = "INDI";
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("isModalShown") === null) {
      sessionStorage.setItem("isModalShown", true);
      setIsOpen(true);
    }
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
      <Modal
        closeOnOverlayClick={false}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        isCentered
        size={["xs", "xl"]}
      >
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="5px" />
        <ModalContent borderRadius={"1rem"}>
          <ModalCloseButton _focusVisible={{ outline: "none" }} />
          <ModalBody
            boxShadow={"0 0 20px gray"}
            borderRadius={"1rem"}
            background={
              "linear-gradient(45deg, rgba(231,206,192,1) 0%, rgba(255,255,255,1) 100%)"
            }
          >
            <VStack p={[3, 10]} gap={5} textAlign={"center"}>
              <Heading
                fontFamily={"'Bebas Neue', sans-serif"}
                textTransform={"uppercase"}
                letterSpacing={"0.1rem"}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
              >
                announcement
              </Heading>
              <Text fontFamily={"'Inter', sans-serif"} textAlign={"justify"}>
                Due to restrictions in certain regions like{" "}
                <span style={{ fontWeight: "bold" }}>
                  India, Russia, and China
                </span>
                , our website's functionality may be limited when accessed via
                mobile data or SIM networks.{" "}
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  For the best experience, please switch to a Wi-Fi connection
                  where available.{" "}
                </span>{" "}
                We apologize for any inconvenience and appreciate your
                understanding. Sincerely,
                <span style={{ fontWeight: "bold" }}> INDI.</span>
              </Text>
              <Button
                bg={"linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b)"}
                _hover={{
                  bg: "linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b)",
                  transform: "scale(1.05)",
                }}
                w={"full"}
                transition={"all 0.3s"}
                onClick={() => setIsOpen(false)}
              >
                I Understand
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
