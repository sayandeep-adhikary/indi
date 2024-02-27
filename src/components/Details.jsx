import {
  Box,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Details({ movieDetails, movieImages }) {
  // console.log(movieDetails)
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Stack direction={["column", "row"]} bg={"#232323"} gap={0}>
      <Box bg={"#232323"} minW={"50%"}></Box>
      <Box bg={"#232323"} minW={"50%"}>
        <VStack divider={<StackDivider />} p={4}>
          <HStack width={"100%"} justifyContent={"space-between"}>
            <Text color={"white"}>
              Title: <span style={{color: 'gray'}}>{movieDetails.title}</span>
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Stack>
  );
}
