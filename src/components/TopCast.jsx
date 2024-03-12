import { Avatar, Box, Card, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export default function TopCast({ id }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    // arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=56c9c02aa32a418f08a672779aa2d077`;
  const [topCast, setTopCast] = useState([]);
  useEffect(() => {
    const getTopCast = async () => {
      const response = await axios.get(url);
      setTopCast(response.data.cast);
    };
    getTopCast();
  }, [url]);

  return (
    <Box p={[4, 8]} py={10} bgColor={"#232323"}>
      <Heading color={"white"} fontFamily={"'Inter', sans-serif"}>
        Top Casts
      </Heading>
      <Box py={5} px={3}>
        {topCast.length === 0 ? (
          <Text color={'gray'}>Nothing to show up here...</Text>
        ) : (
          <Slider {...settings}>
            {topCast &&
              topCast.map((cast) => (
                <Card bg={"#232323"} key={cast.id} variant={"unstyled"}>
                  <Avatar
                    size="2xl"
                    m={4}
                    ml={[4, "22%"]}
                    name={cast.name}
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  />
                  <Text
                    color={"white"}
                    fontWeight={600}
                    fontSize={"1.2rem"}
                    textAlign={"center"}
                  >
                    {cast.name}
                  </Text>
                  <Text color={"gray"} textAlign={"center"}>
                    {cast.character}
                  </Text>
                </Card>
              ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
}
