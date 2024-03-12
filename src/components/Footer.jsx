import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import footerImg from "../assets/footerImg.png";
import { useFirebase } from "../context/Firebase";

export default function Footer() {
  const user = useFirebase().user;
  const [email, setEmail] = useState("");
  const toast = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      setEmail("");
      toast({
        title: "Subscribed Successfully.",
        status: "success",
        variant: "subtle",
        position: "top",
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Please login to subscribe.",
      status: "warning",
      variant: "subtle",
      position: "top",
      isClosable: true,
    });
  };

  return (
    <Box
      bgColor={["#232323", "black"]}
      px={[10, 20]}
      py={["3rem", 30]}
      bgImage={footerImg}
      bgRepeat={"no-repeat"}
      bgPos={"right"}
    >
      <VStack alignItems={"flex-start"} textAlign={"left"} gap={1}>
        <Heading
          color={"white"}
          fontSize={["2.5rem", "4rem"]}
          fontFamily={"'Bebas Neue', sans-serif"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          fontWeight={900}
        >
          Stay Connected
        </Heading>
        <Text
          color={"white"}
          fontSize={["0.9rem", "1rem"]}
          fontFamily={"'Inter', sans-serif"}
          letterSpacing={"2px"}
        >
          From cult classics to modern masterpieces.
        </Text>
        <Text
          color={"white"}
          fontSize={["0.9rem", "1rem"]}
          fontFamily={"'Inter', sans-serif"}
          letterSpacing={"2px"}
        >
          Stay updated with the latest movies, news and articles from INDI.{" "}
        </Text>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl my={5}>
            <Stack gap={[5, 3]} direction={["column", "row"]}>
              <Input
                color={"white"}
                focusBorderColor="white"
                variant="flushed"
                placeholder="Your Email"
                letterSpacing={"1px"}
                _placeholder={{ color: "white" }}
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant={"outline"}
                border={"1.5px solid white"}
                color={"white"}
                p={3}
                borderRadius={"full"}
                px={10}
                letterSpacing={"1px"}
                _hover={{ bgColor: "gray.900" }}
                w={"fit-content"}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </FormControl>
        </form>
      </VStack>
    </Box>
  );
}
