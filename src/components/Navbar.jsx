import {
  Avatar,
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
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import logo from "../assets/indi-logo.svg";
import { CgMenuMotion } from "react-icons/cg";
import { TiHomeOutline, TiHome } from "react-icons/ti";
import { IoSearchOutline, IoSearch } from "react-icons/io5";
import { PiStar, PiStarFill, PiUserCircle } from "react-icons/pi";
import { MdLogout, MdOutlineExplore, MdExplore } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db, useFirebase } from "../context/Firebase";
import { ref as dbRef, onValue } from "firebase/database";

const menuItems = [
  {
    label: "Explore Movies",
    link: "/explore",
    icon: <MdOutlineExplore size={22} />,
  },
  {
    label: "Your Favorites",
    link: "/favorites",
    icon: <PiStar size={21} />,
  },
  {
    label: "Profile",
    link: "/profile",
    icon: <PiUserCircle size={24} />,
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = useFirebase().isLoggedIn;
  const signOutUser = useFirebase().signOutUser;
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user = useFirebase().user;

  const [isHomeFilled, setIsHomeFilled] = useState(true);
  const [isSearchFilled, setIsSearchFilled] = useState(false);
  const [isExploreFilled, setIsExploreFilled] = useState(false);
  const [isFavoritesFilled, setIsFavoritesFilled] = useState(false);

  const setQuery = useFirebase().setQuery;

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.search.value);
    navigate("/search/movies");
    onClose();
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setIsHomeFilled(true);
        setIsSearchFilled(false);
        setIsExploreFilled(false);
        setIsFavoritesFilled(false);
        break;
      case "/search/movies":
        setIsHomeFilled(false);
        setIsSearchFilled(true);
        setIsExploreFilled(false);
        setIsFavoritesFilled(false);
        break;
      case "/explore":
        setIsHomeFilled(false);
        setIsSearchFilled(false);
        setIsExploreFilled(true);
        setIsFavoritesFilled(false);
        break;
      case "/favorites":
        setIsHomeFilled(false);
        setIsSearchFilled(false);
        setIsExploreFilled(false);
        setIsFavoritesFilled(true);
        break;

      default:
        setIsHomeFilled(false);
        setIsSearchFilled(false);
        setIsExploreFilled(false);
        setIsFavoritesFilled(false);
        break;
    }
    const getUserData = () => {
      if (user) {
        const dbR = dbRef(db, `users/${user?.uid}`);
        onValue(dbR, (snapshot) => {
          const data = snapshot?.val() || {};
          setProfilePic(data.profilePic);
          setName(data.name);
        });
      }
    };
    getUserData();
  }, [location, user]);

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
              icon={<MdLogout size={30} color="#ff4e4e" />}
              onClick={() => {
                signOutUser();
                navigate("/");
              }}
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
            <form onSubmit={(e) => handleSearch(e)}>
              <InputGroup
                variant={"filled"}
                bgColor={"gray.800"}
                _hover={{ bgColor: "gray.700" }}
                borderRadius={"1rem"}
                my={2}
                size={"md"}
              >
                <Input
                  bgColor={"gray.800"}
                  name="search"
                  color={"white"}
                  _focusVisible={{ bgColor: "gray.800" }}
                  _hover={{ bgColor: "gray.700" }}
                  py={[10, 3]}
                  textTransform={"capitalize"}
                  type="text"
                  placeholder="Search For Movies"
                  autoComplete="off"
                />
                <InputRightAddon
                  bgColor={"gray.800"}
                  p={0}
                  _hover={{ bg: "#ff4e4e" }}
                  transition={"all 0.3s ease-in-out"}
                >
                  <IconButton
                    icon={<IoSearch size={22} color="white" />}
                    variant="transparent"
                    color={"white"}
                    type="submit"
                  />
                </InputRightAddon>
              </InputGroup>
            </form>
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
            icon={
              isHomeFilled ? <TiHome size={22} /> : <TiHomeOutline size={20} />
            }
            color={"white"}
            bgColor={"#101010"}
            _active={{ bgColor: "#101010" }}
            _hover={{ bgColor: "#101010" }}
          />
        </Link>
        <Link to={"/search/movies"}>
          <IconButton
            icon={
              isSearchFilled ? (
                <IoSearch size={24} />
              ) : (
                <IoSearchOutline size={22} />
              )
            }
            color={"white"}
            bgColor={"#101010"}
            _active={{ bgColor: "#101010" }}
            _hover={{ bgColor: "#101010" }}
          />
        </Link>
        <Link to={"/explore"}>
          <IconButton
            icon={
              isExploreFilled ? (
                <MdExplore size={24} />
              ) : (
                <MdOutlineExplore size={22} />
              )
            }
            color={"white"}
            bgColor={"#101010"}
            _active={{ bgColor: "#101010" }}
            _hover={{ bgColor: "#101010" }}
          />
        </Link>
        <Link to={"/favorites"}>
          <IconButton
            icon={
              isFavoritesFilled ? (
                <PiStarFill size={21} />
              ) : (
                <PiStar size={21} />
              )
            }
            color={"white"}
            bgColor={"#101010"}
            _active={{ bgColor: "#101010" }}
            _hover={{ bgColor: "#101010" }}
          />
        </Link>
        <Link to={"/profile"}>
          {/* <IconButton
            icon={<PiUserCircle size={24} />}
            color={"white"}
            bgColor={"#101010"}
            _active={{ bgColor: "#101010" }}
            _hover={{ bgColor: "#101010" }}
          /> */}
          <Avatar
            size={"xs"}
            name={name}
            bg={"linear-gradient(to right, #ff416c, #ff4b2b)"}
            color={"white"}
            src={profilePic}
          />
        </Link>
      </HStack>
    </>
  );
}
