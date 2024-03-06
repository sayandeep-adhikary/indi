import React, { useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, VStack } from "@chakra-ui/react";

export default function Favorites() {
  const isLoggedIn = useFirebase().isLoggedIn;
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "INDI - Favorites";
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      navigate("/login", { state: { prevUrl: "/favorites" } });
    }
  }, [isLoggedIn, navigate]);
  return (
    <Box p={[4, 8]} py={10} bg={"linear-gradient(to right, #141e30, #243b55)"}>
      <VStack py={20} align={"left"}>
        <Heading color={"white"} fontFamily={"'Inter', sans-serif"}>
          Your Favourites
        </Heading>
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
      </VStack>
    </Box>
  );
}
