import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import logo from "../assets/indi-logo.svg";
import { CgMenuMotion } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const menuItems = [
  {
    label: "Search",
    link: "/",
    icon: <BsSearch size={20} />,
  },
  {
    label: "Top Movies",
    link: "/movies",
    icon: <MdLocalMovies size={20} />,
  },
  {
    label: "Your Favorites",
    link: "/favorites",
    icon: <FaRegStar size={20} />,
  },
  {
    label: "Profile",
    link: "/profile",
    icon: <FaRegUser size={20} />,
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        py={[3, 6]}
        px={[5, 10]}
        justifyContent={"space-between"}
        pos={"absolute"}
        zIndex={5}
        w={"full"}
      >
        <Link to={"/"}>
          <Image src={logo} alt="logo" width={"3rem"} />
        </Link>
        <IconButton
          isRound={true}
          variant="transparent"
          icon={<CgMenuMotion size={30} />}
          onClick={onOpen}
          color={"white"}
        />
      </HStack>

      <Drawer onClose={onClose} isOpen={isOpen} size={["full", "xs"]}>
        <DrawerOverlay />
        <DrawerContent
          bgColor={"transparent"}
          backdropFilter={"blur(5px)"}
          borderLeft={"1px solid gray"}
        >
          <DrawerCloseButton color={"white"} />
          <DrawerHeader>
            <Link to={"/"} onClick={onClose}>
              <Image src={logo} alt="logo" width={"3rem"} />
            </Link>
          </DrawerHeader>
          <DrawerBody
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={["flex-start"]}
          >
            {menuItems.map((item) => (
              <Button
                leftIcon={item.icon}
                variant="solid"
                w={"full"}
                my={2}
                px={[20, 10]}
                justifyContent={["center", "space-between"]}
                gap={[0, 4]}
                key={item.label}
                color={"white"}
                bgColor={"gray.800"}
                // border={'1px solid gray'}
                _hover={{ bgColor: "gray.700" }}
                py={[10, 3]}
              >
                <Container textAlign={"left"}>
                  <Text>{item.label}</Text>
                </Container>
              </Button>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
