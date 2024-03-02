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
import { BiCategory } from "react-icons/bi";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { TiHomeOutline } from "react-icons/ti";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const menuItems = [
  {
    label: "Search",
    link: "/search/movies",
    icon: <BsSearch size={20} />,
  },
  {
    label: "Explore Movies",
    link: "/explore",
    icon: <BiCategory size={20} />,
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
  const isLoggedIn = useFirebase().isLoggedIn;
  const signOutUser = useFirebase().signOutUser;
  const navigate = useNavigate();
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
        <HStack gap={5}>
          {!isLoggedIn ? (
            <Link to={"/login"}>
              <Button colorScheme="red">Get Started</Button>
            </Link>
          ) : (
            <IconButton
              isRound={true}
              variant="transparent"
              icon={<MdLogout size={30} />}
              onClick={signOutUser}
              color={"white"}
              display={["flex", "none"]}
            />
          )}
          <IconButton
            isRound={true}
            variant="transparent"
            icon={<CgMenuMotion size={30} />}
            onClick={onOpen}
            color={"white"}
            display={["none", "flex"]}
          />
        </HStack>
      </HStack>

      <Drawer onClose={onClose} isOpen={isOpen} size={["full", "xs"]}>
        <DrawerOverlay />
        <DrawerContent
          bgColor={"transparent"}
          backdropFilter={"blur(5px)"}
          borderLeft={"1px solid gray"}
        >
          <DrawerCloseButton color={"white"} />
          <DrawerHeader mr={"auto"}>
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
              <Link to={item.link} key={item.label} style={{ width: "100%" }}>
                <Button
                  leftIcon={item.icon}
                  variant="solid"
                  w={"full"}
                  my={2}
                  px={[20, 10]}
                  justifyContent={["center", "space-between"]}
                  gap={[0, 4]}
                  color={"white"}
                  bgColor={"gray.800"}
                  // border={'1px solid gray'}
                  _hover={{ bgColor: "gray.700" }}
                  py={[10, 3]}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <Container textAlign={"left"}>
                    <Text>{item.label}</Text>
                  </Container>
                </Button>
              </Link>
            ))}
            {isLoggedIn && (
              <Button
                leftIcon={<MdLogout size={20} />}
                w={"full"}
                my={2}
                px={[20, 10]}
                justifyContent={["center", "space-between"]}
                gap={[0, 4]}
                py={[10, 3]}
                colorScheme="red"
                onClick={() => {
                  onClose();
                  signOutUser();
                  navigate("/");
                }}
              >
                <Container textAlign={"left"}>
                  <Text>Log Out</Text>
                </Container>
              </Button>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <HStack
        bg={"#101010"}
        justifyContent={"space-between"}
        p={3}
        px={5}
        pos={"fixed"}
        bottom={0}
        w={"full"}
        zIndex={10000}
        display={["flex", "none"]}
      >
        <Link to={"/"}>
          <IconButton
            icon={<TiHomeOutline size={20} />}
            color={"white"}
            bgColor={"#101010"}
            _active={{ bgColor: "#101010" }}
            _hover={{ bgColor: "#101010" }}
          />
        </Link>
        {menuItems.map((item) => (
          <Link to={item.link} key={item.label}>
            <IconButton
              icon={item.icon}
              color={"white"}
              bgColor={"#101010"}
              _active={{ bgColor: "#101010" }}
              _hover={{ bgColor: "#101010" }}
            />
          </Link>
        ))}
      </HStack>
    </>
  );
}
