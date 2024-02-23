import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import m1 from "../assets/interstellar.jpg";
import m2 from "../assets/oppenheimer.jpg";
import m3 from "../assets/aquaman.webp";
import m4 from "../assets/anatomy.jpg";
import m5 from "../assets/rebelMoon.jpg";
import bgSmoke from "../assets/bgSmoke2.png";
import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const carouselItems = [
  {
    id: 157336,
    title: "Interstellar",
    imageURL: m1,
    genres: ["Adventure", "Drama", "Science Fiction"],
    releaseDate: "2014",
    runtime: 169,
    voteAverage: 8.4,
    description:
      "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
  },
  {
    id: 872585,
    title: "Oppenheimer",
    imageURL: m2,
    genres: ["Drama", "History"],
    releaseDate: "2023",
    runtime: 181,
    voteAverage: 8.1,
    description:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
  },
  {
    id: 572802,
    title: "Aquaman and the Lost Kingdom",
    imageURL: m3,
    genres: ["Action", "Adventure", "Fantasy"],
    releaseDate: "2023",
    runtime: 124,
    voteAverage: 6.5,
    description:
      "Fueled by vengeance and armed with the Black Trident, Black Manta is relentless in his pursuit to defeat Aquaman. To save the world from impending destruction, Aquaman forms an unlikely alliance with his imprisoned brother Orm, the former King of Atlantis.",
  },
  {
    id: 915935,
    title: "Anatomy of a Fall",
    imageURL: m4,
    genres: ["Drama", "Mystery"],
    releaseDate: "2021",
    runtime: 152,
    voteAverage: 7.7,
    description:
      "A woman is suspected of her husband's murder, and their blind son faces a moral dilemma as the sole witness.",
  },
  {
    id: 848326,
    title: "Rebel Moon - Part One: A Child of Fire",
    imageURL: m5,
    genres: ["Science Fiction", "Drama", "Action"],
    releaseDate: "2023",
    runtime: 134,
    voteAverage: 6.4,
    description:
      "When a peaceful colony on the edge of the galaxy finds itself threatened by the armies of the tyrannical Regent Balisarius, they dispatch Kora, a young woman with a mysterious past, to seek out warriors from neighboring planets to help them take a stand.",
  },
];

export default function CarouselComponent() {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop
      interval={5000}
      showStatus={false}
      showThumbs={false}
      showArrows={false}
      swipeable={true}
    >
      {carouselItems.map((item) => (
        <Box pos={"relative"} key={item.id}>
          <Image
            height={["70vh", "100vh"]}
            src={item.imageURL}
            alt={item.title}
            filter={"blur(1px) brightness(75%)"}
          />
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
              fontSize={["2.5rem", "6rem"]}
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
              {item.genres.join(", ")} | {item.releaseDate} | {item.runtime}
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
              {item.description}
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
            opacity={0.9}
          />
          {/* <VStack
            bgColor={"black"}
            display={["flex", "none"]}
            top={["5rem", "6rem"]}
            left={["1rem", "2.5rem"]}
            zIndex={10}
            alignItems={"flex-start"}
            textAlign={"left"}
            gap={8}
            p={8}
            minH={'45rem'}
            justifyContent={'center'}
          >
            <Heading
              color={"white"}
              fontSize={["3rem", "6rem"]}
              fontFamily={"'Bebas Neue', sans-serif"}
              letterSpacing={"2px"}
              textTransform={"uppercase"}
              fontWeight={900}
            >
              {item.title}
            </Heading>
            <Text
              color={"gray.400"}
              fontSize={["1rem"]}
              fontFamily={"'Inter', sans-serif"}
              letterSpacing={"1px"}
              pr={"3rem"}
              lineHeight={"180%"}
              fontWeight={900}
            >
              {item.genres.join(", ")} | {item.releaseDate} | {item.runtime}{" Min."}
            </Text>
            <Text
              color={"white"}
              fontSize={["1rem"]}
              fontFamily={"'Inter', sans-serif"}
              letterSpacing={"1px"}
              lineHeight={"180%"}
            >
              {item.description}
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
          </VStack> */}
        </Box>
      ))}
    </Carousel>
  );
}
// box-shadow: rgba(0, 0, 0, 0.45) 1px 1px 40px 0px inset;
