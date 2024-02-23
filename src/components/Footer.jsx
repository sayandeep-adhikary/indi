import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import footerImg from "../assets/footerImg.png";

export default function Footer() {
  return (
    <Box
      bgColor={"black"}
      px={[10, 20]}
      py={[5, 30]}
      bgImage={footerImg}
      bgRepeat={"no-repeat"}
      bgPos={"right"}
    >
      <VStack alignItems={"flex-start"} textAlign={"left"} gap={5}>
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
        <form>
          <FormControl my={5}>
            <Stack gap={[5, 3]} direction={["column", "row"]}>
              <Input
                color={"white"}
                focusBorderColor="white"
                variant="flushed"
                placeholder="Your Email"
                letterSpacing={"1px"}
                _placeholder={{ color: "white" }}
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
